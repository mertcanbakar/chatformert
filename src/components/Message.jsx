/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import classNames from "classnames";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      // className={`message ${message?.senderId === currentUser.uid && "owner"}`}
      className={classNames({
        "flex gap-x-2 p-2 items-end": true,
        "flex-row-reverse": message?.senderId === currentUser.uid,
      })}
    >
      <div>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-8 h-8 object-cover rounded-full border bg-red-300 border-zinc-300"
        />
        {/* <span className="text-sm text-center">just now</span> */}
      </div>
      <div className="max-w-[60%] flex flex-col gap-2">
        <p
          className={classNames({
            "w-full bg-white px-5 py-1 rounded ": true,
            "!bg-gray-600 text-white ": message?.senderId !== currentUser.uid,
          })}
        >
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
