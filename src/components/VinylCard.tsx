import Image from 'next/image';
import { Vinyl } from '@/types/vinyl';

interface VinylCardProps {
  vinyl: Vinyl;
  onClick: () => void;
}

export default function VinylCard({ vinyl, onClick }: VinylCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <Image
          src={vinyl.coverUrl}
          alt={`${vinyl.artist} - ${vinyl.title}`}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{vinyl.title}</h3>
        <p className="text-gray-600 truncate">{vinyl.artist}</p>
        <p className="text-sm text-gray-500">{vinyl.year}</p>
      </div>
    </div>
  );
} 