import { useState } from "react";
import { usePokemonContext } from "./PokeContextProvider";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchFiltered } = usePokemonContext();

  const handleSearch = () => {
    console.log("검색어:", searchTerm);

    searchFiltered(searchTerm);
  };

  return (
    <div className="w-full p-5 pt-16 text-center sm:pt-34">
      {/* 검색창 영역 */}
      <div className="w-full flex justify-center">
        <div className="max-w-[500px] min-w-[200px] flex items-center justify-center bg-yellow-400 gap-1.5 rounded-full p-1.5 border-blue-900 border-4">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-[350px] min-w-[150px] h-[50px] bg-white rounded-full p-3" placeholder="검색어 입력좀요" />
          <button onClick={handleSearch} className="px-3 cursor-pointer h-[50px] font-bold text-xl text-blue-900 rounded-full focus:border-blue-500">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
