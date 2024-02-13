/* eslint-disable react/prop-types */
import classNames from "classnames";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Sidebar({ sidebar }) {
  return (
    <div
      className={classNames({
        "hidden lg:block w-[45%] h-full bg-white p-2 rounded-md": true,
        "!block !w-full ": sidebar,
      })}
    >
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}
