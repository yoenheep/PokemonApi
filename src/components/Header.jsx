import { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { ThemeContext } from "./ThemeProvider";
import { Link } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-congif";
import { useLanguageContext } from "./LanguageProvider";

export default function Header() {
  const { language, changeLanguage } = useLanguageContext();
  const { theme, changeTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout success");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <header className="w-full flex items-center justify-between relative p-5 sm:justify-center flex-col md:flex-row">
      <h1 className="w-[180px] sm:w-[280px]">
        <Link to={"/"}>
          <img src={Logo} />
        </Link>
      </h1>
      <div className="text-center font-semibold dark:text-white right-10 flex items-center justify-center gap-5 mt-3 md:absolute md:mt-0 flex-col md:flex-row">
        {user === null ? (
          <></>
        ) : (
          <div className="font-semibold">
            <p>
              {user.displayName}{" "}
              {language === "ko" ? "트레이너!!" : "trainer!!"}
            </p>
            <p>{language === "ko" ? "환영합니다" : "Welcome"}</p>
          </div>
        )}

        <div className="text-center font-semibold dark:text-white flex items-end justify-center gap-10">
          {user === null ? (
            <Link to={"/login"}>
              <button className="cursor-pointer sm:w-[42px] w-[35px]">
                <img src="https://static.wikia.nocookie.net/pokemon/images/9/9c/%EB%AF%B8%EB%81%84%EB%A9%94%EB%9D%BC_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest?cb=20170802121630&path-prefix=ko" />
                <p>Login</p>
              </button>
            </Link>
          ) : (
            <button
              className="cursor-pointer sm:w-[42px] w-[35px]"
              onClick={logout}
            >
              <img src="https://static.wikia.nocookie.net/pokemon/images/9/9c/%EB%AF%B8%EB%81%84%EB%A9%94%EB%9D%BC_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest?cb=20170802121630&path-prefix=ko" />
              <p>Logout</p>
            </button>
          )}

          <button
            onClick={changeTheme}
            className="cursor-pointer sm:w-[42px] w-[35px]"
          >
            {theme === "light" ? (
              <>
                <img src="https://i.namu.wiki/i/tDykfv_xRSxTM1e-ODwaIrl-7QRUbtxeV06xnhiZ6E6o_pnE4cQVckwMXulqu4adkAU932VHIoDpoSMpNmifiA.webp" />
                <p>Dark</p>
              </>
            ) : (
              <>
                <img src="https://i.namu.wiki/i/HpKMBJhAo0yGI-5Rij2MilxDycqyghP_DEkDpWtSUqgZkfBUcTsdDmQ_3U-0ndbFTq7sQIVBez1M1bLdqi1Klg.webp" />
                <p>Light</p>
              </>
            )}
          </button>

          <button
            onClick={changeLanguage}
            className="cursor-pointer sm:w-[42px] w-[35px]"
          >
            {language === "ko" ? (
              <>
                <img src="https://i.namu.wiki/i/LcwjCZRsiuuqRafySQSymY0PRTYwFH5_QeTMuveyN1sM9zvY0g89AxUqwtiPwcOrOpYpZRu_YoYKgdM2VTdPoA.webp" />
                <p>ENG</p>
              </>
            ) : (
              <>
                <img src="https://i.namu.wiki/i/wlFB015mMPwfrDZoUpY-3vPorwnupo5sRxgIRI0v_LtL85nELDKGMuehUOVq6YS7lx-jPGhYjXt0PImg6DHw3w.webp" />
                <p>KOR</p>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
