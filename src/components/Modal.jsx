export default function Modal() {
  return (
    <dialog className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center h-screen w-screen">
      <div className="relative flex p-10 justify-center rounded-2xl border-4 border-blue-900 bg-white gap-20">
        <button className="absolute top-0 right-4 text-6xl font-extrabold">⨯</button>
        <div className="text-center font-semibold flex flex-col justify-between">
          <p>No.1</p>
          <p>이상해씨</p>
          <div className="flex items-center justify-evenly">
            <div className="rounded-full bg-green-300 w-[100px]">풀</div>
            <div className="rounded-full bg-green-300 w-[100px]">드래곤</div>
          </div>
          <p>무슨타입의 포케몬</p>
          <p>뭐라무라ㅓ마러ㅏ머라머라ㅓㄹ</p>
          <div className="flex items-center justify-evenly">
            <div>
              <div className="py-0.5 px-8 rounded-full bg-gray-100 mb-3">신장</div>
              <p>161cm</p>
            </div>
            <div>
              <div className="py-0.5 px-8 rounded-full bg-gray-100 mb-3">체중</div>
              <p>?????</p>
            </div>
          </div>
        </div>
        <div className="w-[300px]">
          <img src="https://i.pinimg.com/originals/bf/95/c5/bf95c53a70819967d79c6ce2ff6883bc.gif" />
        </div>
      </div>
    </dialog>
  );
}
