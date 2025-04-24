// src/context/PokemonTypeInfo.js
export const PokemonTypeInfo = {
  normal: {
    ko: "노말",
    en: "Normal",
    color: "bg-gray-300 dark:bg-gray-700",
  },
  fire: {
    ko: "불꽃",
    en: "Fire",
    color: "bg-red-400 dark:bg-red-700",
  },
  water: {
    ko: "물",
    en: "Water",
    color: "bg-blue-400 dark:bg-blue-700",
  },
  electric: {
    ko: "전기",
    en: "Electric",
    color: "bg-yellow-300 dark:bg-yellow-700",
  },
  grass: {
    ko: "풀",
    en: "Grass",
    color: "bg-green-400 dark:bg-green-700",
  },
  ice: {
    ko: "얼음",
    en: "Ice",
    color: "bg-blue-200 dark:bg-blue-700",
  },
  fighting: {
    ko: "격투",
    en: "Fighting",
    color: "bg-red-700 dark:bg-red-700",
  },
  poison: {
    ko: "독",
    en: "Poison",
    color: "bg-purple-400 dark:bg-purple-700",
  },
  ground: {
    ko: "땅",
    en: "Ground",
    color: "bg-yellow-600 dark:bg-yellow-700",
  },
  flying: {
    ko: "비행",
    en: "Flying",
    color: "bg-indigo-300 dark:bg-indigo-700",
  },
  psychic: {
    ko: "에스퍼",
    en: "Psychic",
    color: "bg-pink-400 dark:bg-pink-700",
  },
  bug: {
    ko: "벌레",
    en: "Bug",
    color: "bg-lime-400 dark:bg-lime-700",
  },
  rock: {
    ko: "바위",
    en: "Rock",
    color: "bg-yellow-800 dark:bg-yellow-900",
  },
  ghost: {
    ko: "고스트",
    en: "Ghost",
    color: "bg-indigo-400 dark:bg-indigo-900",
  },
  dragon: {
    ko: "드래곤",
    en: "Dragon",
    color: "bg-purple-500 dark:bg-purple-900",
  },
  dark: {
    ko: "악",
    en: "Dark",
    color: "bg-gray-600 dark:bg-gray-900",
  },
  steel: {
    ko: "강철",
    en: "Steel",
    color: "bg-gray-400 dark:bg-gray-700",
  },
  fairy: {
    ko: "페어리",
    en: "Fairy",
    color: "bg-pink-200 dark:bg-pink-700",
  },
};

export const TypeInfo = (englishType, lang = "ko") => {
  const typeInfo = PokemonTypeInfo[englishType?.toLowerCase()];
  return typeInfo
    ? {
        name: typeInfo[lang] || englishType, // 언어별 이름
        color: typeInfo.color, // 색상 유지
      }
    : { name: englishType, color: "bg-gray-300" }; // 예외 처리
};
