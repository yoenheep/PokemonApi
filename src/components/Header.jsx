import Logo from "../assets/logo.png";
import Luna from "../assets/luna.png";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center relative p-5">
      <h1 className="w-[280px]">
        <img src={Logo} />
      </h1>
      <div className="w-12 h-12 absolute right-10">
        <button>
          <img src={Luna} />
        </button>
      </div>
    </header>
  );
}
