import { useState } from "react";
import Add from "../../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [type, setType] = useState("password");

  const handleVisible = () => {
    setType(type === "password" ? "text" : "password");
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[4].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95%] h-[80%] lg:w-[50%] p-3 bg-blue-100 shadow-sm shadow-zinc-400 rounded-md border border-zinc-300 flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl mb-10 text-purple-800">
          Chat For Mert
        </h1>
        <h1 className="text-blue-900 text-xl mb-2 pb-2 border-b border-zinc-300 w-full text-center">
          Hemen hesap oluşturabilirsin!
        </h1>
        <div className="w-[90%] flex flex-col p-2 my-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-y-3"
          >
            <div className="w-full">
              <input
                required
                className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
                type="text"
                placeholder="Kullanıcı Adı"
              />
            </div>
            <div className="w-full">
              <input
                required
                className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
                type="email"
                placeholder="E-Posta"
              />
            </div>
            <div className="w-full relative">
              <input
                className="border border-zinc-300 w-full h-14 outline-none rounded-md p-2"
                type={type}
                placeholder="Şifre"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleVisible();
                }}
                className="absolute flex justify-center items-center p-3 right-1 top-1/2 transform -translate-y-1/2 rounded-full opacity-60 hover:bg-zinc-100 transition-colors"
              >
                {type === "text" ? (
                  <HiMiniEye size={22} />
                ) : (
                  <HiMiniEyeSlash size={22} />
                )}
              </button>
            </div>
            <div className="cursor-pointer">
              <input
                required
                style={{ display: "none" }}
                type="file"
                id="file"
              />
              <label className="flex items-center gap-x-3" htmlFor="file">
                <img src={Add} alt="avatar" className="w-10" />
                <span>Fotoğrafını seç</span>
              </label>
            </div>
            <button
              className="w-full p-2 bg-[#5e35b1] text-white rounded-md"
              disabled={loading}
            >
              Kayıt ol
            </button>
            {loading && (
              <span className="text-blue-800">
                Hesap oluşturuluyor. Lütfen bekleyin.
              </span>
            )}
            {err && <span>Bir şeyler yanlış gitti...</span>}
          </form>
          <p className="text-center mt-10">
            Zaten bir hesabın var mı?{" "}
            <Link className="text-[#5e35b1]" to="/login">
              Giriş yap.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
