const BASE_URL = "https://pokeapi.co/api/v2";

// 포켓몬 목록 가져오기
export const fetchPokemons = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("포켓몬 목록 가져오기 실패:", error);
    throw error;
  }
};

// 포켓몬 상세 정보 가져오기
export const fetchPokemonDetails = async (nameOrId) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("포켓몬 상세 정보 가져오기 실패:", error);
    throw error;
  }
};

// 포켓몬 종족 정보 가져오기 (한국어 이름 포함)
export async function fetchPokemonSpecies(nameOrUrl) {
  const url = typeof nameOrUrl === "string" && nameOrUrl.startsWith("http") ? nameOrUrl : `https://pokeapi.co/api/v2/pokemon-species/${nameOrUrl}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API 요청 실패");
    }
    const speciesData = await response.json();

    // speciesData.names 배열에서 "ko" 언어의 이름을 찾아 반환
    const koreanName = speciesData.names.find((name) => name.language.name === "ko")?.name || speciesData.name; // 기본 영어 이름 사용

    return {
      koreanName,
      names: speciesData.names,
      flavor_text_entries: speciesData.flavor_text_entries,
      // 필요한 다른 정보들 반환
    };
  } catch (err) {
    console.error("포켓몬 종족 정보 가져오기 실패:", err);
    throw err;
  }
}
// 포켓몬 전체 목록 호출
export const fetchAllPokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("포켓몬 목록 가져오기 실패:", error);
    throw error;
  }
};
