import Header from "./components/Header";
import Search from "./components/Search";
import BackGif from "./components/BackGif";
import CardMain from "./components/CardMain";
import Loading from "./components/Loading";
import Top from "./components/Top";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="bg-gray-50 relative">
      {/* loading */}
      {/* <Loading /> */}

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
  );
}

export default App;
