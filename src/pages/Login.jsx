import Header from "../components/Header";
import BackGif from "../components/BackGif";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase-congif";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLanguageContext } from "../components/LanguageProvider";

export default function Login() {
  const { language } = useLanguageContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await loginWithEmailPassword(email, password);

    if (!result.success) {
      alert(result.message);
      return;
    }

    // 로그인 성공 시 처리
    console.log("로그인 성공 사용자:", result.user);
    navigate("/");
  };

  const loginWithEmailPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공!", userCredential.user);
      return { success: true, user: userCredential.user };
    } catch (error) {
      let message = "";

      switch (error.code) {
        case "auth/invalid-credential":
          message = "이메일 혹은 비밀번호가 맞지않습니다.";
          break;
        case "auth/invalid-email":
          message = "이메일 형식이 올바르지 않습니다.";
          break;
        default:
          message = `에러: ${error.code}`;
      }

      return { success: false, message };
    }
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex justify-center items-center mt-15">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px] flex flex-col gap-6 items-center">
          <h2 className="text-blue-900 font-extrabold text-3xl text-center">Login</h2>
          <div className="w-full flex items-center bg-yellow-400 gap-1.5 rounded-full p-1.5 border-blue-900 border-4">
            <label htmlFor="email" className="px-3 h-[50px] font-bold text-xl text-blue-900 leading-[50px]">
              {language === "ko" ? "이메일" : "Email"}
            </label>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 h-[50px] bg-white rounded-full p-3" />
          </div>

          <div className="w-full flex items-center bg-yellow-400 gap-1.5 rounded-full p-1.5 border-blue-900 border-4">
            <label htmlFor="password" className="px-3 h-[50px] font-bold text-xl text-blue-900 leading-[50px]">
              {language === "ko" ? "비밀번호" : "Password"}
            </label>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 h-[50px] bg-white rounded-full p-3" />
          </div>

          <button type="submit" className="bg-yellow-400 text-white px-2 rounded-full font-bold hover:bg-yellow-500 flex items-center justify-center">
            <img src="https://item.kakaocdn.net/do/53797c59906081926eeae16f012d01388f324a0b9c48f77dbce3a43bd11ce785" className="h-15" />
            <p className="pr-3 pl-1.5 text-lg font-semibold">{language === "ko" ? "로그인" : "Login"}</p>
          </button>

          <div className="text-center dark:text-white">
            <span>{language === "ko" ? "계정이 없으신가요용?" : "No account?"} </span>
            <Link to="/signup" className="text-yellow-700 underline">
              {language === "ko" ? "회원가입" : "Signup"}
            </Link>
          </div>
        </form>
      </div>

      <div className="bottom-0 w-full">
        <BackGif />
      </div>
    </div>
  );
}
