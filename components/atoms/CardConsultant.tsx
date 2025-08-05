import Image from "next/image";

interface CardConsultantProps {
  image: string;
  name: string;
  category: string;
  onDetailClick: () => void;
}

export default function CardConsultant({
  image,
  name,
  category,
  onDetailClick,
}: CardConsultantProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="h-24 w-36 rounded-2xl"
        />
        <div>
          <h3 className="font-semibold text-[#016A70]">{name}</h3>
          <p className="text-sm text-slate-500">{category}</p>
        </div>
      </div>
      <div className="flex items-center px-8">
        <button
          onClick={onDetailClick}
          className="px-4 py-2 bg-[#016A70] rounded-lg cursor-pointer"
        >
          Detail
        </button>
      </div>
    </div>
  );
}
