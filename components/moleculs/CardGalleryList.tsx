import { cardGalleryData } from "../../data/cardGallery";
import CardGallery from "../atoms/CardGallery";

export default function CardGalleryList() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
      {cardGalleryData.slice(0, 6).map((item, idx) => (
        <CardGallery
          key={idx}
          image={item.image}
          icon={item.icon}
          description={item.description}
        />
      ))}
    </div>
  );
}
