import { cardServiceData } from "../../data/cardService";
import CardService from "../atoms/CardService";

export default function CardServiceList() {
  return (
    <div className="w-full flex justify-between py-4">
      {cardServiceData.map((item, idx) => (
        <CardService
          key={idx}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
}
