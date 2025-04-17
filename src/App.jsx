import { useEffect } from "react";
import Logo from "./assets/logo.png";
import Luna from "./assets/luna.png";

function App() {
  useEffect(() => {
    const getPoketmon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("error" + error);
      } finally {
        console.log("호출 ㄱ트");
      }
    };

    getPoketmon();
  }, []);

  return (
    <div>
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

      {/* search */}
      <div className="w-full py-5 text-center">
        <div className="w-full py-10 flex justify-center gap-3.5">
          <button className="px-4 py-3 rounded-full font-bold bg-gray-400 text-white">dragon</button>
          <button className="px-5 py-3 border border-black rounded-full">dragon</button>
          <button className="px-5 py-3 border border-black rounded-full">dragon</button>
          <button className="px-5 py-3 border border-black rounded-full">dragon</button>
          <button className="px-5 py-3 border border-black rounded-full">dragon</button>
        </div>
        <div className="w-full flex justify-center">
          <div className="max-w-[500px] flex items-center justify-center bg-yellow-400 gap-2.5 rounded-full p-2.5 border-blue-900 border-4">
            <input type="text" className="w-[350px] h-[50px] bg-white rounded-full" />
            <button className="px-3 h-[50px] font-bold text-xl text-blue-900 rounded-full focus:border-blue-500">search</button>
          </div>
        </div>
      </div>

      {/* 피카츄뛰는 배경 */}
      <div></div>
    </div>
  );
}

export default App;
