// app/components/FacilityCard.tsx
import Image from "next/image";

interface FacilityCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className="group relative transition border rounded-lg shadow-sm w-full max-w-xl hover:border-black/20 text-zinc-800 bg-zinc-100/50 border-black/10">
      {/* CardDecorator */}
      <span className="border-[#1d2088] absolute -left-px -top-px block size-2 border-l-2 border-t-2" />
      <span className="border-[#1d2088] absolute -right-px -top-px block size-2 border-r-2 border-t-2" />
      <span className="border-[#1d2088] absolute -bottom-px -left-px block size-2 border-b-2 border-l-2" />
      <span className="border-[#1d2088] absolute -bottom-px -right-px block size-2 border-b-2 border-r-2" />
      {/* CardHeader */}
      <div className="p-4 md:p-6">
        <p className="mt-4 text-xl md:text-2xl font-semibold tracking-tight text-black/95">
          {description}
        </p>
      </div>
      {/* Content */}
      <div className="relative border-dashed border-t border-black/10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(125%_125%_at_50%_0%,transparent_40%,rgba(255,255,255,0.06)_100%)]" />
        <div className="aspect-[4/3] p-4 md:p-6">
          <div className="h-full w-full overflow-hidden border border-black/10 bg-zinc-100/40">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1207}
              height={929}
              className="h-full w-full object-cover"
              style={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;