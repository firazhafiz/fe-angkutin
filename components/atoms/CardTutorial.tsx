interface CardTutorialProps {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  created_at: string;
}

export default function CardTutorial({ videoUrl, title, description }: CardTutorialProps) {
  return (
    <div className="w-full p-4 bg-white rounded-lg overflow-hidden">
      <div className="flex">
        {/* Left: Image */}
        <div className="w-[600px] h-[360px] relative">
          <iframe
            className="w-full h-full rounded-lg"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;  full-screen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div>
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-3">{title}</h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed line-clamp-4">{description}</p>
            <button className="w-fit px-6 py-3 bg-tosca text-white font-semibold rounded-lg hover:bg-tosca/90 transition-colors mt-4">Watch now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
