import { cardServiceData } from "../../data/cardService";
import CardService from "../atoms/CardService";

export default function CardServiceList() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-center gap-4 justify-between py-4">
      {cardServiceData.map((item, idx) => (
        <CardService key={idx} icon={item.icon} title={item.title} description={item.description} />
      ))}
    </div>
  );
}
