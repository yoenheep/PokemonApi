import SelectType from "./SelectType";

export default function Search() {
  return (
    <div className="w-full py-5 text-center">
      <div className="w-full py-10 flex justify-center gap-3.5">
        <SelectType />
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-[500px] flex items-center justify-center bg-yellow-400 gap-2.5 rounded-full p-2.5 border-blue-900 border-4">
          <input type="text" className="w-[350px] h-[50px] bg-white rounded-full p-3" />
          <button className="px-3 h-[50px] font-bold text-xl text-blue-900 rounded-full focus:border-blue-500">search</button>
        </div>
      </div>
    </div>
  );
}
