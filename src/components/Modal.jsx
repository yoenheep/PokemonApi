export default function Modal({ selectedPokemon, setSelectedPokemon }) {
  console.log(selectedPokemon);
  if (!selectedPokemon) return null; // selectedPokemon이 없으면 모달이 표시되지 않음

  const handleClose = () => {
    setSelectedPokemon(null); // 모달 닫기
  };

  // selectedPokemon 데이터가 잘못된 경우 대체 값을 처리
  const types = selectedPokemon.types || []; // 타입이 없을 경우 빈 배열 처리
  const flavorText = selectedPokemon.flavorText || "설명 데이터 없음"; // 설명이 없을 경우 대체 텍스트

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center h-screen w-screen">
      <div className="relative flex flex-col-reverse gap-10 p-10 justify-center rounded-2xl border-4 border-blue-900 bg-white max-w-screen-sm mx-4 text-black dark:text-white dark:bg-black sm:flex-row sm:gap-0">
        <button onClick={handleClose} className="absolute top-2 right-4 text-4xl font-extrabold">
          ⨯
        </button>

        <div className="text-center font-semibold flex flex-col justify-between gap-6  sm:w-1/2">
          {/* 포켓몬 ID와 한국어 이름 */}
          <p className="text-xl font-bold">No. {selectedPokemon.id}</p>
          <p className="text-2xl">{selectedPokemon.koreanName}</p>

          {/* 포켓몬 타입 */}
          <div className="flex flex-wrap justify-center gap-2">
            {types.length > 0 ? (
              types.map((type, index) => (
                <div
                  key={index}
                  className={`rounded-full ${type.type.color} px-4 py-1 w-[90px] text-center`} // 타입에 맞는 색상 적용
                >
                  {type.type.koreanName} {/* 한국어 타입명 */}
                </div>
              ))
            ) : (
              <div className="text-gray-500">타입 정보 없음</div>
            )}
          </div>

          {/* 게임 내 설명 */}
          <p className="text-gray-700 dark:text-gray-200 text-[16px]">{flavorText}</p>

          {/* 키와 몸무게 */}
          <div className="flex items-center justify-evenly">
            <div className="text-center">
              <div className="py-0.5 px-8 rounded-full bg-gray-100 mb-3 dark:bg-gray-800">신장</div>
              <p>{selectedPokemon.height} cm</p> {/* height: cm 단위로 변환됨 */}
            </div>
            <div className="text-center">
              <div className="py-0.5 px-8 rounded-full bg-gray-100 mb-3 dark:bg-gray-800">체중</div>
              <p>{selectedPokemon.weight} kg</p> {/* weight: kg 단위로 변환됨 */}
            </div>
          </div>
        </div>

        {/* 포켓몬 이미지 */}
        <div className="flex justify-center items-center sm:w-1/2">
          <img src={selectedPokemon.animatedImageUrl || selectedPokemon.imageUrl} alt={selectedPokemon.koreanName} className="object-contain w-3/4 max-h-80" />
        </div>
      </div>
    </div>
  );
}
