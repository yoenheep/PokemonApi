import { useContext, useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { ThemeContext } from "./ThemeProvider";
import { Link } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-congif";

export default function Header() {
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
            <p>{user.displayName} 트레이너!! </p>
            <p>환영합니다</p>
          </div>
        )}

        <div className="text-center font-semibold dark:text-white flex items-end justify-center gap-10">
          {user === null ? (
            <Link to={"/login"}>
              <button className="cursor-pointer sm:w-[42px] w-[35px]">
                <img src="https://i.namu.wiki/i/woY_nQ0twLrzOJNBL9RoyelLgcz98pBrbEIXXfflB9NXsuJ2_ebhXstxucKfEtHXmLhf_fKYqm7YiEQgWL-MG5hg_-E-h_ZIJXqtIg80yi-0Y55t7pW5b5WbI5C8_iaAvyVUpAiH95xgUN53LKr6hg.webp" />
                <p>Login</p>
              </button>
            </Link>
          ) : (
            <button className="cursor-pointer sm:w-[42px] w-[35px]" onClick={logout}>
              <img src="https://i.namu.wiki/i/woY_nQ0twLrzOJNBL9RoyelLgcz98pBrbEIXXfflB9NXsuJ2_ebhXstxucKfEtHXmLhf_fKYqm7YiEQgWL-MG5hg_-E-h_ZIJXqtIg80yi-0Y55t7pW5b5WbI5C8_iaAvyVUpAiH95xgUN53LKr6hg.webp" />
              <p>Logout</p>
            </button>
          )}

          <button onClick={changeTheme} className="cursor-pointer sm:w-[42px] w-[35px]">
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
        </div>
      </div>
    </header>
  );
}
