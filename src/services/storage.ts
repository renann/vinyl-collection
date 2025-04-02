import { Vinyl } from '@/types/vinyl';

const STORAGE_KEY = 'vinyl_collection';

export function getVinyls(): Vinyl[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveVinyl(vinyl: Vinyl): void {
  if (typeof window === 'undefined') return;
  
  const vinyls = getVinyls();
  const index = vinyls.findIndex(v => v.id === vinyl.id);
  
  if (index >= 0) {
    vinyls[index] = vinyl;
  } else {
    vinyls.push(vinyl);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vinyls));
}

export function deleteVinyl(id: string): void {
  if (typeof window === 'undefined') return;
  
  const vinyls = getVinyls().filter(v => v.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vinyls));
}

export function getVinylById(id: string): Vinyl | null {
  return getVinyls().find(v => v.id === id) || null;
}

export function getGenres(): string[] {
  const vinyls = getVinyls();
  return [...new Set(vinyls.map(v => v.genre))].sort();
} 