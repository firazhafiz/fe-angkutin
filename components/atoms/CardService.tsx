import Image from "next/image";

interface CardServiceProps {
  icon: string;
  title: string;
  description: string;
}

export default function CardService({
  icon,
  title,
  description,
}: CardServiceProps) {
  return (
    <div className="flex flex-col items-center justify-start bg-white rounded-2xl shadow-lg px-6 py-8 min-w-[220px] max-w-xs transition-transform hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
      <div className="w-16 h-16 flex items-center justify-center mb-4">
        <Image
          src={icon}
          alt={title}
          width={64}
          height={64}
          className="object-contain w-full h-full"
        />
      </div>
      <h3 className="text-xl font-bold text-center mb-2 text-tosca">{title}</h3>
      <p className="text-gray-600 text-center text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}
