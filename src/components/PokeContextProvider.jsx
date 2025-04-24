import { createContext, useContext, useState, useEffect } from "react";
import { fetchPokemons, fetchPokemonDetails, fetchPokemonSpecies, fetchAllPokemons } from "./PokeApi";
import { TypeInfo } from "./PokemonTypeInfo";

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState(null);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchAndBuildPokemons = async (source, isSearch = false) => {
    try {
      setError(null);

      const data = await source();

      if (!data.results || data.results.length === 0) {
        console.log("❗ 더 이상 포켓몬 없음");
        return [];
      }

      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          try {
            const detailData = await fetchPokemonDetails(pokemon.name);
            const speciesData = await fetchPokemonSpecies(detailData.species?.url);

            const koreanName = speciesData.names.find((name) => name.language.name === "ko")?.name || pokemon.name;
            const id = (pokemon.url || detailData.species.url)?.split("/")[6];
            const koreanFlavorText = speciesData.flavor_text_entries.find((entry) => entry.language.name === "ko")?.flavor_text || "";

            const types = detailData.types.map((type) => {
              const { koreanName, color } = TypeInfo(type.type.name);
              return {
                ...type,
                type: {
                  ...type.type,
                  koreanName,
                  color,
                },
              };
            });

            return {
              ...detailData,
              id,
              koreanName,
              flavorText: koreanFlavorText,
              types,
              height: detailData.height / 10,
              weight: detailData.weight / 10,
            };
          } catch (err) {
            console.warn(`포켓몬 개별 로딩 실패: ${pokemon.name}`, err);
            return null;
          }
        })
      );

      const filtered = pokemonsWithDetails.filter(Boolean);

      if (isSearch) {
        return filtered;
      } else {
        setPokemons((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newOnes = filtered.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newOnes];
        });
        setOffset((prev) => prev + limit);
      }
    } catch (err) {
      console.error("포켓몬 불러오기 오류:", err);
      setError("포켓몬 데이터를 가져오지 못했습니다.");
      if (isSearch) setSearchPokemons([]);
    }
  };

  const getPokemons = async () => {
    setScrollLoading(true);
    try {
      await fetchAndBuildPokemons(() => fetchPokemons(offset, limit));
    } catch (err) {
      console.error(err);
    } finally {
      setScrollLoading(false);
    }
  };

  const searchFiltered = async (term) => {
    if (!term) return setSearchPokemons(null);
    try {
      setSearchLoading(true);
      const results = await fetchAndBuildPokemons(fetchAllPokemons, true);
      const filtered = results.filter((pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()) || pokemon.koreanName.toLowerCase().includes(term.toLowerCase()));

      setSearchPokemons(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  // 초기 포켓몬 목록 로드
  useEffect(() => {
    getPokemons();
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  const value = {
    pokemons,
    searchPokemons,
    searchLoading,
    scrollLoading,
    error,
    getPokemons,
    searchFiltered,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};
