import Grass from "../assets/grass.png";

export default function BackGif() {
  return (
    <div className="w-full py-5">
      <div className=" mx-20 flex items-end justify-between">
        <img src="https://media.tenor.com/uUNcnHwYJQEAAAAi/running-pikachu-transparent-snivee.gif" className="w-[130px]" />
        <img src="https://i.gifer.com/origin/6d/6d067d7dd323a4cbc792f280968cd641_w200.gif" className="w-[130px]" />
      </div>
      <div>
        <img src={Grass} className="w-full h-10" />
      </div>
    </div>
  );
}
