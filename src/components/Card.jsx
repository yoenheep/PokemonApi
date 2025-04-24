import { useState, useEffect } from "react";
import { TypeInfo } from "./PokemonTypeInfo";

export default function Card({ pokemon, onClick }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [animatedImageUrl, setAnimatedImageUrl] = useState(null);
  const [pokemonId, setPokemonId] = useState(null);

  useEffect(() => {
    const id = pokemon.id;
    setPokemonId(id);

    const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    const staticUrl = `${baseUrl}/${id}.png`;
    const animatedUrl = `${baseUrl}/versions/generation-v/black-white/animated/${id}.gif`;

    setImageUrl(staticUrl); // 일반 PNG 이미지 세팅

    // 🧠 GIF 존재 여부 확인 후 설정
    const checkImageExists = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return url;
        } else {
          return null;
        }
      } catch {
        return null;
      }
    };

    checkImageExists(animatedUrl).then((result) => {
      setAnimatedImageUrl(result); // 있으면 세팅, 없으면 null
    });
  }, [pokemon.url]);

  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const { color } = TypeInfo(primaryType);

  const handleCardClick = () => {
    onClick({
      ...pokemon,
      imageUrl,
      animatedImageUrl,
    });
  };

  return (
    <div className="transition-all duration-300 bg-white w-[200px] h-[270px] hover:w-[230px] hover:h-[300px] font-semibold p-5 flex flex-col justify-between shadow-xl cursor-pointer sm:w-[230px] sm:h-[300px] sm:hover:w-[260px] sm:hover:h-[330px] dark:bg-black dark:text-white" onClick={handleCardClick}>
      <div className="rounded-full border border-gray-100 flex w-fit dark:border-gray-700">
        <span className={`rounded-full px-2 ${color}`}>{String(pokemonId).padStart(3, "0")}</span>
        <span className="px-2.5">{pokemon.koreanName || pokemon.name}</span>
      </div>

      <div className="w-full">
        {animatedImageUrl || imageUrl ? (
          <img
            src={animatedImageUrl || imageUrl}
            onError={(e) => {
              e.target.onerror = null; // 무한 루프 방지
              if (animatedImageUrl && e.target.src === animatedImageUrl && imageUrl) {
                e.target.src = imageUrl; // gif 없으면 png로 fallback
              } else {
                // 둘 다 실패한 경우 텍스트 fallback
                e.target.outerHTML = `
          <div class='w-3/4 h-24 mx-auto bg-gray-100 flex items-center justify-center'>
            <p>이미지 없음</p>
          </div>
        `;
              }
            }}
            alt={pokemon.koreanName || pokemon.name}
            className={`pokemon-sprite ${animatedImageUrl ? "animated" : "static"} w-3/4 h-auto max-h-34 object-contain mx-auto`}
          />
        ) : (
          <div className="w-3/4 h-24 mx-auto bg-gray-100 flex items-center justify-center">
            <p>이미지 로딩중...</p>
          </div>
        )}
      </div>

      <div className="ml-auto rounded-full border border-gray-200 px-2 dark:border-gray-700">
        <p>ⓒPokemon</p>
      </div>
    </div>
  );
}
