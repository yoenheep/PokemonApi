import { useContext } from "react";
import Logo from "../assets/logo.png";
import { ThemeContext } from "./ThemeProvider";

export default function Header() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <header className="w-full flex items-center justify-between relative p-5 sm:justify-center">
      <h1 className="w-[180px] sm:w-[280px]">
        <img src={Logo} />
      </h1>
      <div className="w-8 h-8 text-center font-semibold dark:text-white sm:w-12 sm:h-12 absolute right-10">
        <button onClick={changeTheme} className="cursor-pointer">
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
    </header>
  );
}
