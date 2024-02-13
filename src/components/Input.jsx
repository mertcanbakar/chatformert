/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { IoMdSend } from "react-icons/io";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async (e) => {
    e.preventDefault();
    // if (img) {
    //   const storageRef = ref(storage, uuid());

    //   const uploadTask = uploadBytesResumable(storageRef, img);

    //   uploadTask.on(
    //     (error) => {
    //       //TODO:Handle Error
    //     },
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //         await updateDoc(doc(db, "chats", data.chatId), {
    //           messages: arrayUnion({
    //             id: uuid(),
    //             text,
    //             senderId: currentUser.uid,
    //             date: Timestamp.now(),
    //             img: downloadURL,
    //           }),
    //         });
    //       });
    //     }
    //   );
    // } else {
    if (text !== "") {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }
    setText("");
    setImg(null);
  };
  return (
    <form
      onSubmit={handleSend}
      className="flex justify-between gap-x-1 items-center"
    >
      <input
        className="w-full outline-none border-b border-zinc-300 p-4 bg-transparent"
        type="text"
        placeholder="Bir şeyler yaz..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        className="p-2 flex justify-center items-center text-white bg-green-600 rounded-full"
        type="submit"
      >
        <IoMdSend size={22} />
      </button>
    </form>
  );
};

export default Input;
