import { UrlData } from '../types';

export interface AppContextType {
  urls: UrlData[];
  filteredUrls: UrlData[];
  searchTerm: string;
  addUrl: (url: string) => void;
  deleteUrl: (id: string) => void;
  setSearchTerm: (term: string) => void;
  incrementClicks: (id: string) => void;
}