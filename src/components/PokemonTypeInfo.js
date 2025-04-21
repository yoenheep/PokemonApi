// src/context/PokemonTypeInfo.js
export const PokemonTypeInfo = {
  normal: {
    ko: "노말",
    color: "bg-gray-300 dark:bg-gray-700",
  },
  fire: {
    ko: "불꽃",
    color: "bg-red-400 dark:bg-red-700",
  },
  water: {
    ko: "물",
    color: "bg-blue-400 dark:bg-blue-700",
  },
  electric: {
    ko: "전기",
    color: "bg-yellow-300 dark:bg-yellow-700",
  },
  grass: {
    ko: "풀",
    color: "bg-green-400 dark:bg-green-700",
  },
  ice: {
    ko: "얼음",
    color: "bg-blue-200 dark:bg-blue-700",
  },
  fighting: {
    ko: "격투",
    color: "bg-red-700 dark:bg-red-700",
  },
  poison: {
    ko: "독",
    color: "bg-purple-400 dark:bg-purple-700",
  },
  ground: {
    ko: "땅",
    color: "bg-yellow-600 dark:bg-yellow-700",
  },
  flying: {
    ko: "비행",
    color: "bg-indigo-300 dark:bg-indigo-700",
  },
  psychic: {
    ko: "에스퍼",
    color: "bg-pink-400 dark:bg-pink-700",
  },
  bug: {
    ko: "벌레",
    color: "bg-lime-400 dark:bg-lime-700",
  },
  rock: {
    ko: "바위",
    color: "bg-yellow-800 dark:bg-yellow-900",
  },
  ghost: {
    ko: "고스트",
    color: "bg-indigo-400 dark:bg-indigo-900",
  },
  dragon: {
    ko: "드래곤",
    color: "bg-purple-500 dark:bg-purple-900",
  },
  dark: {
    ko: "악",
    color: "bg-gray-600 dark:bg-gray-900",
  },
  steel: {
    ko: "강철",
    color: "bg-gray-400 dark:bg-gray-700",
  },
  fairy: {
    ko: "페어리",
    color: "bg-pink-200 dark:bg-pink-700",
  },
};

// KoreanType 함수는 한국어 이름과 색상 둘 다 반환하도록 수정
export const TypeInfo = (englishType) => {
  const typeInfo = PokemonTypeInfo[englishType?.toLowerCase()];
  return typeInfo ? { koreanName: typeInfo.ko, color: typeInfo.color } : { koreanName: englishType, color: "bg-gray-300" };
};
