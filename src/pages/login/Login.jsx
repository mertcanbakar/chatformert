import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { HiMiniEyeSlash, HiMiniEye } from "react-icons/hi2";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const [type, setType] = useState("password");

  const handleVisible = () => {
    setType(type === "password" ? "text" : "password");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95%] h-[80%] lg:w-[50%] p-3 bg-blue-100 shadow-sm shadow-zinc-400 rounded-md border border-zinc-300 flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl mb-10 text-purple-800">
          Chat For Mert
        </h1>
        <h1 className="text-blue-900 text-xl mb-2 pb-2 border-b border-zinc-300 w-[50%] text-center">
          Selam, tekrar hoş geldin.
        </h1>
        <div className="w-[90%] flex flex-col p-2 my-3">
          <form
            className="flex flex-col justify-center items-center gap-y-3"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <input
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
            <button className="w-full p-2 bg-[#5e35b1] text-white rounded-md">
              Giriş Yap
            </button>
            {err && (
              <span className="text-red-900 my-2">
                Bir şeyler yanlış gitti...
              </span>
            )}
          </form>
          <p className="text-center mt-10">
            Hesabın yok mu?{" "}
            <Link className="text-[#5e35b1]" to="/register">
              Kayıt ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
