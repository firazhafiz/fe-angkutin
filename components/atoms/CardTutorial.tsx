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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Video */}
        <div className="w-full lg:w-[600px] h-[220px] sm:h-[300px] lg:h-[360px] relative mb-4 lg:mb-0">
          <iframe
            className="w-full h-full rounded-lg"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; full-screen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-0 lg:p-6 flex flex-col items-start justify-center">
          <div>
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4 line-clamp-3">{title}</h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-4">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
