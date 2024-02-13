import { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);
  console.log(data);
  return (
    <div className="bg-zinc-100 w-full h-full p-2 border border-zinc-300 rounded-md">
      <div className=" flex justify-between bg-white border-b border-zinc-300">
        {data.user && (
          <div className="flex gap-x-2 p-2 items-center">
            <img
              src={data.user?.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <span>{data.user?.displayName}</span>
          </div>
        )}
        <div className="flex justify-center items-center">
          <img src={Cam} alt="icons" className="w-8 h-8" />
          <img src={Add} alt="icons" className="w-8 h-8" />
          <img src={More} alt="icons" className="w-8 h-8" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}
