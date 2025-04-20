// src/context/PokemonContext.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  fetchPokemons,
  fetchPokemonDetails,
  fetchPokemonSpecies,
} from "./PokeApi";
import { KoreanType } from "./KoreanType";

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
      const data = await fetchPokemons(offset, limit);

      const pokemonsWithKoreanNames = await Promise.all(
        data.results.map(async (pokemon) => {
          const speciesData = await fetchPokemonSpecies(pokemon.name);
          const koreanName =
            speciesData.names.find((name) => name.language.name === "ko")
              ?.name || pokemon.name;

          const id = pokemon.url.split("/")[6];
          return { ...pokemon, koreanName, id };
        })
      );

      setPokemons((prevPokemons) => {
        const existingIds = new Set(prevPokemons.map((p) => p.id));
        const filteredNew = pokemonsWithKoreanNames.filter(
          (p) => !existingIds.has(p.id)
        );
        return [...prevPokemons, ...filteredNew];
      });

      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      setError("포켓몬 목록을 불러오는데 실패했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 특정 포켓몬 상세 정보 가져오기
  const getPokemonDetails = async (nameOrId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonDetails(nameOrId);

      // 한국어 이름 가져오기
      const speciesData = await fetchPokemonSpecies(data.species.url);
      const koreanName =
        speciesData.names.find((name) => name.language.name === "ko")?.name ||
        data.name;

      // 타입을 한국어로 변환
      const koreanTypes = data.types.map((type) => ({
        ...type,
        type: {
          ...type.type,
          koreanName: KoreanType(type.type.name),
        },
      }));

      // 설명(flavor text) 가져오기
      const koreanFlavorText =
        speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "ko"
        )?.flavor_text || "";

      setSelectedPokemon({
        ...data,
        koreanName,
        types: koreanTypes,
        flavorText: koreanFlavorText,
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
  }, []);

  const value = {
    pokemons,
    selectedPokemon,
    loading,
    error,
    getPokemons,
    getPokemonDetails,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
