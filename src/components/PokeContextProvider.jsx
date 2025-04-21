import { createContext, useContext, useState, useEffect } from "react";
import { fetchPokemons, fetchPokemonDetails, fetchPokemonSpecies } from "./PokeApi";
import { TypeInfo } from "./PokemonTypeInfo";

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  // 포켓몬 목록 가져오기
  const getPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemons(offset, limit); // offset과 limit 기반 목록 요청

      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          try {
            const detailData = await fetchPokemonDetails(pokemon.name);
            const speciesUrl = detailData.species?.url;
            const speciesData = await fetchPokemonSpecies(speciesUrl); // 💡 species URL 직접 사용

            const koreanName = speciesData.names.find((name) => name.language.name === "ko")?.name || pokemon.name;

            const id = pokemon.url.split("/")[6];

            const koreanFlavorText = speciesData.flavor_text_entries.find((entry) => entry.language.name === "ko")?.flavor_text || "";

            // 타입 처리
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
              ...pokemon,
              koreanName,
              id,
              types,
              height: detailData.height / 10, // cm
              weight: detailData.weight / 10, // kg
              flavorText: koreanFlavorText,
            };
          } catch (err) {
            console.warn(`⚠️ 포켓몬 개별 로딩 실패: ${pokemon.name}`, err);
            return null; // 실패한 포켓몬은 무시
          }
        })
      );

      const filteredPokemons = pokemonsWithDetails.filter(Boolean); // null 제거

      // 중복 제거 후 추가
      setPokemons((prevPokemons) => {
        const existingIds = new Set(prevPokemons.map((p) => p.id));
        const filteredNew = filteredPokemons.filter((p) => !existingIds.has(p.id));
        return [...prevPokemons, ...filteredNew];
      });

      setOffset((prevOffset) => prevOffset + limit); // 다음 페이지 준비
    } catch (error) {
      setError("포켓몬 목록을 불러오는데 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 특정 포켓몬 상세 정보 가져오기
  const getPokemonDetails = async (nameOrId, imageData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchPokemonDetails(nameOrId);
      const speciesData = await fetchPokemonSpecies(data.species.url);

      const koreanName = speciesData.names.find((name) => name.language.name === "ko")?.name || data.name;
      const koreanTypes = data.types.map((type) => {
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

      // 한국어 설명을 가져오기
      const koreanFlavorText = speciesData.flavor_text_entries.find((entry) => entry.language.name === "ko")?.flavor_text || "";

      setSelectedPokemon({
        ...data,
        koreanName,
        types: koreanTypes,
        flavorText: koreanFlavorText,
        height: data.height / 10, // 키는 cm로 변환
        weight: data.weight / 10, // 몸무게는 kg로 변환
        imageUrl: imageData?.imageUrl, // 이미지 추가
        animatedImageUrl: imageData?.animatedImageUrl,
      });
    } catch (error) {
      setError("포켓몬 상세 정보를 불러오는데 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 초기 포켓몬 목록 로드
  useEffect(() => {
    getPokemons();
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  const value = {
    pokemons,
    selectedPokemon,
    loading,
    error,
    getPokemons,
    getPokemonDetails,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};
