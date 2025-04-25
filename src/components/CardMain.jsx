import { useState, useEffect } from "react";
import { usePokemonContext } from "./PokeContextProvider";
import Loading from "./Loading";
import Card from "./Card";
import Modal from "./Modal"; // 모달 import
import Nimpia from "../assets/Nimpia.gif";
import { useLanguageContext } from "./LanguageProvider";

export default function CardMain() {
  const { language } = useLanguageContext();
  const { pokemons, searchLoading, scrollLoading, error, getPokemons, searchPokemons } = usePokemonContext();
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 모달 상태

  const handleLoadMore = () => {
    if (scrollLoading) return; // 로딩 중일 때는 요청하지 않음
    getPokemons();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;

      // 스크롤이 페이지 바닥에 가까워지면 추가 데이터를 요청
      if (scrollBottom - scrollPosition < 100 && !scrollLoading) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollLoading]); // 로딩 상태만 의존성으로 넣어서 최적화

  const listToRender = searchPokemons !== null ? searchPokemons : pokemons;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-15 justify-items-center pb-10 pt-15 sm:mx-40">
        {error && <p className="error">{error}</p>}
        {searchLoading && (
          <div className="col-span-full">
            <Loading />
          </div>
        )}
        {searchPokemons?.length === 0 ? (
          <div className="text-center font-semibold col-span-full dark:text-white">
            <img src={Nimpia} />
            {language === "ko" ? <p>검색 결과가 없습니당</p> : <p>no result</p>}
          </div>
        ) : (
          listToRender.map((pokemon) => (
            <Card
              key={pokemon.id}
              pokemon={pokemon}
              onClick={(pokemonWithImage) => {
                setSelectedPokemon(pokemonWithImage);
              }}
            />
          ))
        )}
      </div>
      {scrollLoading && <Loading />}
      {/* 모달 */}
      {selectedPokemon && <Modal selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />}
    </div>
  );
}
