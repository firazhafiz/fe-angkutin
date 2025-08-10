import { cardBenefitData } from "../../data/cardBenefit";
import CardBenefit from "../atoms/CardBenefit";

export default function CardBenefitList() {
  return (
    <div className="w-full px-4 md:px-0 flex flex-row justify-center gap-10 flex-wrap">
      {cardBenefitData.slice(0, 3).map((item, idx) => (
        <CardBenefit key={idx} image={item.image} title={item.title} description={item.description} />
      ))}
    </div>
  );
}
