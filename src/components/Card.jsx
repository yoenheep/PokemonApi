export default function Card() {
  return (
    <div className="bg-white w-[230px] h-[300px] font-semibold p-5 flex flex-col justify-between shadow-xl hover:w-[260px] hover:h-[330px]">
      <div className="rounded-full border border-gray-100 flex w-fit">
        <span className="rounded-full bg-green-300 px-2">001</span>
        <span className="px-2.5">이상해씨</span>
      </div>
      <div className="w-full">
        <img src="https://i.pinimg.com/originals/bf/95/c5/bf95c53a70819967d79c6ce2ff6883bc.gif" className="w-3/4 mx-auto" />
      </div>
      <div className="ml-auto rounded-full border border-gray-200 px-2">
        <p>ⓒPokemon</p>
      </div>
    </div>
  );
}
