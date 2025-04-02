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
      genre: data.genre || ['Unknown'],
      label: data.label[0] || 'Unknown',
      coverImage: data.images[0]?.uri || '',
      format: 'Vinyl',
      condition: 'Near Mint',
      tracklist: data.tracklist.map(track => ({
        position: track.position,
        title: track.title,
        duration: '0:00' // Default duration since Discogs API doesn't provide it
      }))
    };
  } catch (error) {
    console.error('Error fetching vinyl:', error);
    return null;
  }
} 