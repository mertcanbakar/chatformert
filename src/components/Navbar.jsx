import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="">
      <h1 className="text-lg w-full text-center font-bold text-blue-900">
        CFM
      </h1>
      <div className=" flex justify-between p-1 items-center gap-x-2">
        <div className="flex justify-center items-center gap-x-1">
          <img
            src={currentUser.photoURL}
            alt="avatar photo"
            className="w-8 h-8 object-cover rounded-full border border-zinc-300"
          />
          <p className="text-zinc-500 text-xs">{currentUser.displayName}</p>
        </div>
        <button
          className="p-1 text-xs rounded-md bg-red-100 text-red-900"
          onClick={() => signOut(auth)}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Navbar;
