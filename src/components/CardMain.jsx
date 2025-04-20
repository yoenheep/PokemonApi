import { useState, useEffect } from "react";
import { usePokemonContext } from "./PokeContextProvider";
import Loading from "./Loading"; // Loading 임포트
import Card from "./Card";

export default function CardMain() {
  const { pokemons, loading, error, getPokemons } = usePokemonContext();
  const [scrolling, setScrolling] = useState(false); // 스크롤 상태 추적

  const handleLoadMore = () => {
    if (loading) return; // 이미 로딩 중이면 요청하지 않음
    getPokemons();
  };

  // 스크롤 이벤트를 감지하는 useEffect
  useEffect(() => {
    const handleScroll = () => {
      // 페이지의 전체 높이와 현재 스크롤 위치를 비교
      const scrollBottom =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;

      // 페이지 하단에 가까워지면 로드 트리거
      if (scrollBottom - scrollPosition < 100) {
        if (!scrolling) {
          setScrolling(true);
          handleLoadMore();
        }
      } else {
        setScrolling(false); // 스크롤이 페이지 위로 올라가면 상태 초기화
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // cleanup
    };
  }, [scrolling, loading]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-15 justify-items-center py-10 px-40">
        {error && <p className="error">{error}</p>}
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} /> // pokemon.id로 key 설정
        ))}
      </div>
      {loading && <Loading />}
    </div>
  );
}
