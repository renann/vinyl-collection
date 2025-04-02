'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getVinylById, updateVinyl, deleteVinyl } from '@/services/storage';
import { Vinyl } from '@/types/vinyl';

interface DetailsPageProps {
  params: {
    id: string;
  };
}

export default function DetailsPage({ params }: DetailsPageProps) {
  const router = useRouter();
  const [vinyl, setVinyl] = useState<Vinyl | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const vinylData = getVinylById(params.id);
    if (vinylData) {
      setVinyl(vinylData);
      setNotes(vinylData.notes || '');
    } else {
      setError('Vinyl not found');
    }
    setIsLoading(false);
  }, [params.id]);

  const handleSave = () => {
    if (vinyl) {
      updateVinyl({ ...vinyl, notes });
      router.push('/');
    }
  };

  const handleDelete = () => {
    if (vinyl) {
      deleteVinyl(vinyl.id);
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !vinyl) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">{error || 'Vinyl not found'}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vinyl Details</h1>
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => router.push('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={vinyl.coverImage}
                alt={`${vinyl.artist} - ${vinyl.title}`}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold mb-2">{vinyl.title}</h2>
              <p className="text-xl text-gray-600 mb-6">{vinyl.artist}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Year</p>
                  <p className="font-medium">{vinyl.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Genre</p>
                  <p className="font-medium">{vinyl.genre.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Format</p>
                  <p className="font-medium">{vinyl.format}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Label</p>
                  <p className="font-medium">{vinyl.label}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium">{vinyl.condition}</p>
                </div>
                {vinyl.purchaseDate && (
                  <div>
                    <p className="text-sm text-gray-500">Purchase Date</p>
                    <p className="font-medium">{vinyl.purchaseDate}</p>
                  </div>
                )}
                {vinyl.purchasePrice && (
                  <div>
                    <p className="text-sm text-gray-500">Purchase Price</p>
                    <p className="font-medium">${vinyl.purchasePrice}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 