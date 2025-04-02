'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import VinylDetails from '@/components/VinylDetails';
import { SearchResult, Vinyl } from '@/types/vinyl';
import { DiscogsService } from '@/services/discogs';

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedVinyl, setSelectedVinyl] = useState<Vinyl | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
    setSelectedVinyl(null);
  };

  const handleSelectVinyl = async (vinyl: SearchResult) => {
    setIsLoading(true);
    try {
      const details = await DiscogsService.getInstance().getVinylDetails(vinyl.id);
      if (details) {
        setSelectedVinyl(details);
      }
    } catch (error) {
      console.error('Failed to fetch vinyl details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Vinyl Collection</h1>
        
        <SearchBar onSearchResults={handleSearchResults} />
        
        {isLoading ? (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <SearchResults
            results={searchResults}
            onSelectVinyl={handleSelectVinyl}
          />
        )}

        {selectedVinyl && (
          <VinylDetails
            vinyl={selectedVinyl}
            onClose={() => setSelectedVinyl(null)}
          />
        )}
      </div>
    </main>
  );
} 