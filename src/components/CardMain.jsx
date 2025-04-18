import Card from "./Card";

export default function CardMain() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-15 justify-items-center py-10 px-40">
      <Card />
    </div>
  );
}
