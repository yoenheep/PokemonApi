import TopImg from "../assets/topImg.png";

export default function Top() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  return (
    <div className="w-[50px] bottom-3 right-3 fixed z-10 cursor-pointer transition-transform transform hover:translate-y-[-15px] sm:w-[70px] sm:bottom-10 sm:right-10" onClick={scrollToTop}>
      <img src={TopImg} />
      <p className="text-center font-semibold dark:text-white">TOP</p>
    </div>
  );
}
