import { useState, useEffect } from "react";
import { usePokemonContext } from "./PokeContextProvider";

export default function Card({ pokemon }) {
  const { getPokemonDetails } = usePokemonContext();
  const [imageUrl, setImageUrl] = useState(null); // 빈 문자열 대신 null로 초기화
  const [animatedImageUrl, setAnimatedImageUrl] = useState(null); // 빈 문자열 대신 null로 초기화
  const [pokemonId, setPokemonId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animatedImageError, setAnimatedImageError] = useState(false);

  useEffect(() => {
    // URL에서 ID 추출하기
    const extractIdFromUrl = () => {
      const urlParts = pokemon.url.split("/");
      return urlParts[urlParts.length - 2];
    };

    const id = extractIdFromUrl();
    setPokemonId(id);

    // 정적 이미지 URL 설정
    setImageUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    );

    // 움직이는 GIF URL 설정 (앞면)
    setAnimatedImageUrl(
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
    );
  }, [pokemon.url]);

  const handleClick = () => {
    getPokemonDetails(pokemon.name);
  };

  const handleAnimatedImageError = () => {
    // GIF 이미지 로드 실패 시 에러 상태 설정
    setAnimatedImageError(true);
  };

  const handleStaticImageLoad = () => {
    // 정적 이미지 로드 완료
    setImageLoaded(true);
  };

  return (
    <div
      className="bg-white w-[230px] h-[300px] font-semibold p-5 flex flex-col justify-between shadow-xl hover:w-[260px] hover:h-[330px]"
      onClick={handleClick}
    >
      <div className="rounded-full border border-gray-100 flex w-fit">
        <span className="rounded-full bg-green-300 px-2">
          {String(pokemonId).padStart(3, "0")}
        </span>
        <span className="px-2.5">{pokemon.koreanName || pokemon.name}</span>
      </div>
      <div className="w-full">
        {animatedImageUrl && !animatedImageError ? (
          <img
            src={animatedImageUrl}
            alt={pokemon.koreanName || pokemon.name}
            className="pokemon-sprite animated w-3/4 h-auto max-h-34 object-contain mx-auto"
            onError={handleAnimatedImageError}
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt={pokemon.koreanName || pokemon.name}
            className="pokemon-sprite static w-3/4 h-auto max-h-34 object-contain mx-auto"
            onLoad={handleStaticImageLoad}
          />
        ) : (
          // 이미지가 로드되기 전에 보여줄 자리 표시자
          <div className="w-3/4 h-24 mx-auto bg-gray-100 flex items-center justify-center">
            <p>이미지 로딩중...</p>
          </div>
        )}
      </div>
      <div className="ml-auto rounded-full border border-gray-200 px-2">
        <p>ⓒPokemon</p>
      </div>
    </div>
  );
}
