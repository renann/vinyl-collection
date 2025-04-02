import { Vinyl } from '@/types/vinyl';

const STORAGE_KEY = 'vinyl_collection';

export const getVinyls = (): Vinyl[] => {
  if (typeof window === 'undefined') return [];
  
  const storedVinyls = localStorage.getItem(STORAGE_KEY);
  return storedVinyls ? JSON.parse(storedVinyls) : [];
};

export const saveVinyl = (vinyl: Vinyl): void => {
  if (typeof window === 'undefined') return;
  
  const vinyls = getVinyls();
  vinyls.push(vinyl);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vinyls));
};

export const updateVinyl = (vinyl: Vinyl): void => {
  if (typeof window === 'undefined') return;
  
  const vinyls = getVinyls();
  const index = vinyls.findIndex(v => v.id === vinyl.id);
  if (index !== -1) {
    vinyls[index] = vinyl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vinyls));
  }
};

export const deleteVinyl = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  const vinyls = getVinyls();
  const filteredVinyls = vinyls.filter(vinyl => vinyl.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredVinyls));
};

export const getVinylById = (id: string): Vinyl | undefined => {
  if (typeof window === 'undefined') return undefined;
  
  const vinyls = getVinyls();
  return vinyls.find(vinyl => vinyl.id === id);
};

export const getGenres = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  const vinyls = getVinyls();
  const genres = new Set<string>();
  vinyls.forEach(vinyl => vinyl.genre.forEach(g => genres.add(g)));
  return Array.from(genres);
}; 