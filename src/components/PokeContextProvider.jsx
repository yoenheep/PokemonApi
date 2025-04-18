// PokemonContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Context 생성
const PokemonContext = createContext();

// Context Provider 컴포넌트
export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};
