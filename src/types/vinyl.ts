export interface Vinyl {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string[];
  format: string;
  label: string;
  coverImage: string;
  tracklist: Track[];
  notes?: string;
  condition: 'Mint' | 'Near Mint' | 'Very Good Plus' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
  purchaseDate?: string;
  purchasePrice?: number;
}

export interface Track {
  position: string;
  title: string;
  duration: string;
}

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverImage: string;
  format: string;
}

export interface DiscogsResponse {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string[];
  label: string[];
  tracklist: {
    position: string;
    title: string;
  }[];
  images: {
    uri: string;
    height: number;
    width: number;
  }[];
} 