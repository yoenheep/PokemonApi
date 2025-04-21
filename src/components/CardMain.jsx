import { useState, useEffect } from "react";
import { usePokemonContext } from "./PokeContextProvider";
import Loading from "./Loading";
import Card from "./Card";
import Modal from "./Modal"; // 모달 import

export default function CardMain() {
  const { pokemons, loading, error, getPokemons, getPokemonDetails } = usePokemonContext();
  const [selectedPokemon, setSelectedPokemon] = useState(null); // 모달 상태

  const handleLoadMore = () => {
    if (loading) return; // 로딩 중일 때는 요청하지 않음
    getPokemons();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;

      // 스크롤이 페이지 바닥에 가까워지면 추가 데이터를 요청
      if (scrollBottom - scrollPosition < 100 && !loading) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // 로딩 상태만 의존성으로 넣어서 최적화

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-15 justify-items-center py-10 sm:mx-40">
        {error && <p className="error">{error}</p>}
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={(pokemonWithImage) => {
              getPokemonDetails(pokemonWithImage.name);
              setSelectedPokemon(pokemonWithImage);
            }}
          />
        ))}
      </div>
      {loading && <Loading />}
      {/* 모달 */}
      {selectedPokemon && <Modal selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />}
    </div>
  );
}
