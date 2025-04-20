import Header from "./components/Header";
import Search from "./components/Search";
import BackGif from "./components/BackGif";
import CardMain from "./components/CardMain";
import Top from "./components/Top";
import Modal from "./components/Modal";
import { PokemonProvider } from "./components/PokeContextProvider";

function App() {
  return (
    <PokemonProvider>
      <div className="bg-gray-50 relative">
        {/* header */}
        <Header />

        {/* search */}
        <Search />

        {/* 피카츄뛰는 배경 */}
        <BackGif />

        {/* ㄹㅇ포켓몬 카드리스트 */}
        <CardMain />

        {/* top 버튼 */}
        <Top />

        {/* modal */}
        {/* <Modal /> */}
      </div>
    </PokemonProvider>
  );
}

export default App;
