import TopImg from "../assets/topImg.png";

export default function Top() {
  return (
    <div className="fixed z-10 bottom-10 right-10 transition-transform transform hover:translate-y-[-15px]">
      <img src={TopImg} className="w-[70px]" />
      <p className="text-center font-semibold">TOP</p>
    </div>
  );
}
