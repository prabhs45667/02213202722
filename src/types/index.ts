export interface UrlData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
  validUntil: string; // ISO string for expiry
  customCode?: string; // Optional custom shortcode
}