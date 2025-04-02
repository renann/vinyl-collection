import Image from 'next/image';
import { SearchResult } from '@/types/vinyl';

interface SearchResultsProps {
  results: SearchResult[];
  onSelectVinyl: (vinyl: SearchResult) => void;
}

export default function SearchResults({ results, onSelectVinyl }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No results found. Try searching for something else.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {results.map((vinyl) => (
        <div
          key={vinyl.id}
          onClick={() => onSelectVinyl(vinyl)}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-square">
            <Image
              src={vinyl.coverImage || '/placeholder-vinyl.jpg'}
              alt={`${vinyl.title} by ${vinyl.artist}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg truncate">{vinyl.title}</h3>
            <p className="text-gray-600 truncate">{vinyl.artist}</p>
            <p className="text-sm text-gray-500">{vinyl.year}</p>
            <p className="text-sm text-gray-500">{vinyl.format}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 