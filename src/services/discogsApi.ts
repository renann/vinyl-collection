import { DiscogsResponse, Vinyl } from '@/types/vinyl';

const DISCOGS_TOKEN = 'YOUR_DISCOGS_TOKEN';
const BASE_URL = 'https://api.discogs.com';

export async function fetchVinylFromDiscogs(id: string): Promise<Vinyl | null> {
  try {
    const response = await fetch(`${BASE_URL}/releases/${id}`, {
      headers: {
        'Authorization': `Discogs token=${DISCOGS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vinyl data');
    }

    const data: DiscogsResponse = await response.json();

    return {
      id: data.id,
      title: data.title,
      artist: data.artist,
      year: data.year,
      genre: data.genre[0] || 'Unknown',
      label: data.label[0] || 'Unknown',
      coverUrl: data.images[0]?.uri || '',
      tracklist: data.tracklist.map(track => `${track.position}. ${track.title}`)
    };
  } catch (error) {
    console.error('Error fetching vinyl:', error);
    return null;
  }
} 