import CardTutorial from "../atoms/CardTutorial";
import { tutorialCardData } from "../../data/cardTutorial";

export default function CardTutorialList() {
  return (
    <div className="w-full space-y-8">
      {tutorialCardData.map((tutorial, index) => (
        <CardTutorial
          key={index}
          image={tutorial.image}
          title={tutorial.title}
          description={tutorial.description}
        />
      ))}
    </div>
  );
}
