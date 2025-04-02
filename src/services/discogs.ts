import { SearchResult, Vinyl } from '@/types/vinyl';

const DISCOGS_API_URL = 'https://api.discogs.com';
const DISCOGS_TOKEN = process.env.NEXT_PUBLIC_DISCOGS_TOKEN;

export class DiscogsService {
  private static instance: DiscogsService;
  private headers: HeadersInit;

  private constructor() {
    this.headers = {
      'Authorization': `Discogs token=${DISCOGS_TOKEN}`,
      'User-Agent': 'VinylApp/1.0',
    };
  }

  public static getInstance(): DiscogsService {
    if (!DiscogsService.instance) {
      DiscogsService.instance = new DiscogsService();
    }
    return DiscogsService.instance;
  }

  async searchVinyl(query: string): Promise<SearchResult[]> {
    try {
      const response = await fetch(
        `${DISCOGS_API_URL}/database/search?q=${encodeURIComponent(query)}&type=release&format=vinyl`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      return data.results.map((result: any) => ({
        id: result.id.toString(),
        title: result.title,
        artist: result.artist?.[0] || 'Unknown Artist',
        year: result.year || 0,
        coverImage: result.cover_image || '',
        format: result.format?.[0] || 'Vinyl',
      }));
    } catch (error) {
      console.error('Error searching vinyl:', error);
      return [];
    }
  }

  async getVinylDetails(id: string): Promise<Vinyl | null> {
    try {
      const response = await fetch(
        `${DISCOGS_API_URL}/releases/${id}`,
        { headers: this.headers }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch vinyl details');
      }

      const data = await response.json();
      return {
        id: data.id.toString(),
        title: data.title,
        artist: data.artists?.[0]?.name || 'Unknown Artist',
        year: data.year || 0,
        genre: data.genres || [],
        format: data.formats?.[0]?.name || 'Vinyl',
        label: data.labels?.[0]?.name || 'Unknown Label',
        coverImage: data.cover_image || '',
        tracklist: data.tracklist?.map((track: any) => ({
          position: track.position || '',
          title: track.title || '',
          duration: track.duration || '',
        })) || [],
        condition: 'Near Mint', // Default condition, should be set by user
      };
    } catch (error) {
      console.error('Error fetching vinyl details:', error);
      return null;
    }
  }
} 