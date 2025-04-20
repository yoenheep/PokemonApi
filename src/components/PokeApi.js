const BASE_URL = "https://pokeapi.co/api/v2";

// 포켓몬 목록 가져오기
export const fetchPokemons = async (offset = 0, limit = 20) => {
  try {
    const response = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

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
export const fetchPokemonSpecies = async (nameOrUrl) => {
  try {
    let url;
    if (typeof nameOrUrl === "string" && nameOrUrl.startsWith("http")) {
      url = nameOrUrl;
    } else {
      url = `${BASE_URL}/pokemon-species/${nameOrUrl}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API 요청 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("포켓몬 종족 정보 가져오기 실패:", error);
    throw error;
  }
};
