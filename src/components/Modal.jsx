import { useLanguageContext } from "./LanguageProvider"; // 언어 context import
import { TypeInfo } from "./PokemonTypeInfo";

export default function Modal({ selectedPokemon, setSelectedPokemon }) {
  const { language } = useLanguageContext();

  // selectedPokemon이 없으면 모달이 표시되지 않도록 처리
  if (!selectedPokemon) return null;

  const handleClose = () => setSelectedPokemon(null);

  const types = selectedPokemon.types || [];
  const flavorText = selectedPokemon.flavorText || (language === "ko" ? "설명 데이터 없음" : "No description available");

  // 키와 체중 라벨을 언어에 맞게 동적으로 변경
  const heightLabel = language === "ko" ? "키" : "Height";
  const weightLabel = language === "ko" ? "체중" : "Weight";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center h-screen w-screen">
      <div className="relative flex flex-col-reverse gap-10 p-10 justify-center rounded-2xl border-4 border-blue-900 bg-white max-w-screen-sm mx-4 text-black dark:text-white dark:bg-black sm:flex-row sm:gap-0">
        <button onClick={handleClose} className="absolute top-2 right-4 text-4xl font-extrabold">
          ⨯
        </button>

        <div className="text-center font-semibold flex flex-col justify-between gap-6 sm:w-1/2">
          <p className="text-xl font-bold">No. {selectedPokemon.id}</p>
          <p className="text-2xl">{language === "ko" ? selectedPokemon.koreanName : selectedPokemon.name}</p>

          {/* 타입 표시 */}
          <div className="flex flex-wrap justify-center gap-2">
            {types.length > 0 ? (
              types.map((type, index) => {
                const { name, color } = TypeInfo(type.type.name, language);
                return (
                  <div key={index} className={`rounded-full ${color} px-4 py-1 w-[90px] text-center`}>
                    {name}
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500">{language === "ko" ? "타입 정보 없음" : "No type data"}</div>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-200 text-[16px]">{flavorText}</p>

          <div className="flex items-center justify-evenly">
            <div className="text-center">
              <div className="py-0.5 px-8 rounded-full bg-gray-100 mb-3 dark:bg-gray-800">{heightLabel}</div>
              <p>{selectedPokemon.height} m</p>
            </div>
            <div className="text-center">
              <div className="py-0.5 px-8 rounded-full bg-gray-100 mb-3 dark:bg-gray-800">{weightLabel}</div>
              <p>{selectedPokemon.weight} kg</p>
            </div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="flex justify-center items-center sm:w-1/2">
          <img src={selectedPokemon.animatedImageUrl || selectedPokemon.imageUrl} alt={selectedPokemon.koreanName} className="object-contain w-3/4 max-h-80" />
        </div>
      </div>
    </div>
  );
}
