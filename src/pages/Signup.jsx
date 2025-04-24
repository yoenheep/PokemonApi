import { useState } from "react";
import Header from "../components/Header";
import BackGif from "../components/BackGif";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-congif";
import { useNavigate } from "react-router";
import { useLanguageContext } from "../components/LanguageProvider";

export default function Signup() {
  const { language } = useLanguageContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickName, setNickName] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지않습니다");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: nickName,
      });
      console.log("회원가입", userCredential.user);
      navigate("/");
    } catch (error) {
      console.log("오류", error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex justify-center items-center mt-15">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px] flex flex-col gap-6 items-center">
          <h2 className="text-blue-900 font-extrabold text-3xl text-center">SignUp</h2>
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

          <div className="w-full flex items-center bg-yellow-400 gap-1.5 rounded-full p-1.5 border-blue-900 border-4">
            <label htmlFor="confirmPassword" className="px-3 h-[50px] font-bold sm:text-xl text-blue-900 leading-[50px] text-sm">
              {language === "ko" ? "비밀번호 확인" : "Password Check"}
            </label>
            <input type="password" placeholder="password Check" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="flex-1 h-[50px] bg-white rounded-full p-3" />
          </div>

          <div className="w-full flex items-center bg-yellow-400 gap-1.5 rounded-full p-1.5 border-blue-900 border-4">
            <label htmlFor="nickName" className="px-3 h-[50px] font-bold text-xl text-blue-900 leading-[50px]">
              {language === "ko" ? "닉네임" : "Nickname"}
            </label>
            <input type="text" placeholder="nickName" id="nickName" value={nickName} onChange={(e) => setNickName(e.target.value)} className="flex-1 h-[50px] bg-white rounded-full p-3" />
          </div>

          <button type="submit" className="bg-yellow-400 text-white px-3 py-1 rounded-full font-bold hover:bg-yellow-500 flex items-center justify-center">
            <p className="pr-3 pl-1.5 text-lg font-semibold">{language === "ko" ? "회원가입" : "Signup"}</p>
            <img src="https://i.namu.wiki/i/7LCz5cVP-kTkTf_m8nynpb8K3LsSgvrK8J2HewLlNt9PAuUKZeKH-8_3wlRi_SdNT2keacnfOX4mdqoYYg80AQ.webp" className="h-13" />
          </button>
        </form>
      </div>

      <div className=" bottom-0 w-full">
        <BackGif />
      </div>
    </div>
  );
}
