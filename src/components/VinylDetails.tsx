import Image from 'next/image';
import { Vinyl } from '@/types/vinyl';

interface VinylDetailsProps {
  vinyl: Vinyl;
  onClose: () => void;
}

export default function VinylDetails({ vinyl, onClose }: VinylDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{vinyl.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square">
              <Image
                src={vinyl.coverImage || '/placeholder-vinyl.jpg'}
                alt={`${vinyl.title} by ${vinyl.artist}`}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Artist:</span> {vinyl.artist}</p>
                <p><span className="font-medium">Year:</span> {vinyl.year}</p>
                <p><span className="font-medium">Genre:</span> {vinyl.genre.join(', ')}</p>
                <p><span className="font-medium">Format:</span> {vinyl.format}</p>
                <p><span className="font-medium">Label:</span> {vinyl.label}</p>
                <p><span className="font-medium">Condition:</span> {vinyl.condition}</p>
                {vinyl.purchaseDate && (
                  <p><span className="font-medium">Purchase Date:</span> {vinyl.purchaseDate}</p>
                )}
                {vinyl.purchasePrice && (
                  <p><span className="font-medium">Purchase Price:</span> ${vinyl.purchasePrice}</p>
                )}
              </div>

              {vinyl.notes && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Notes</h3>
                  <p className="text-gray-600">{vinyl.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Tracklist</h3>
            <div className="space-y-2">
              {vinyl.tracklist.map((track, index) => (
                <div key={index} className="flex justify-between items-center py-1 border-b">
                  <span>{track.position} {track.title}</span>
                  <span className="text-gray-500">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 