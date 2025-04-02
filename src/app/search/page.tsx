'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { fetchVinylFromDiscogs } from '@/services/discogsApi';
import { saveVinyl } from '../../../services/storage';
import { Vinyl } from '@/types/vinyl';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResult, setSearchResult] = useState<Vinyl | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearchResult(null);

    try {
      const vinyl = await fetchVinylFromDiscogs(searchQuery);
      if (vinyl) {
        setSearchResult(vinyl);
      } else {
        setError('Vinyl not found');
      }
    } catch (err) {
      setError('Error fetching vinyl information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (searchResult) {
      saveVinyl(searchResult);
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add Vinyl</h1>
          <button
            onClick={() => router.push('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Discogs ID"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isLoading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Search
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {searchResult && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={searchResult.coverImage}
                  alt={`${searchResult.artist} - ${searchResult.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{searchResult.title}</h2>
                <p className="text-xl text-gray-600 mb-4">{searchResult.artist}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-medium">{searchResult.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-medium">{searchResult.genre.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Format</p>
                    <p className="font-medium">{searchResult.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Label</p>
                    <p className="font-medium">{searchResult.label}</p>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add to Collection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 