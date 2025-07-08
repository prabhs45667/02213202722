import { UrlData } from '../types';

export interface AppContextType {
  urls: UrlData[];
  filteredUrls: UrlData[];
  searchTerm: string;
  addUrl: (url: string, options?: { customCode?: string; validityMinutes?: number }) => void;
  deleteUrl: (id: string) => void;
  setSearchTerm: (term: string) => void;
  incrementClicks: (id: string) => void;
}