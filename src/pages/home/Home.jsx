import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import { TiMessages } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

import { useState } from "react";

function Home() {
  const [sidebar, setSidebar] = useState(false);
  const handleClick = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="relative">
      {sidebar && (
        <div className="absolute inset-y-0 left-0 z-50 bg-white w-64 shadow-lg transition-all">
          <div className="w-full flex justify-end p-2">
            <button onClick={handleClick}>
              <IoClose size={26} />
            </button>
          </div>
          <Sidebar sidebar={sidebar} />
        </div>
      )}
      <div className="w-full h-full bg-[#fefefe] flex flex-col items-center lg:justify-center">
        <div className="w-full p-2 lg:hidden">
          <button onClick={handleClick}>
            <TiMessages size={26} />
          </button>
        </div>
        <div className="w-[95%] h-[90%] lg:w-[65%] border border-zinc-300 bg-blue-50 shadow-lg shadow-zinc-300 p-2 rounded-md flex gap-x-2">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Home;
