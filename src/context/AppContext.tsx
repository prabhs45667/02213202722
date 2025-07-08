import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UrlData } from '../types';
import { AppContextType } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('shortened-urls');
    if (saved) {
      try {
        setUrls(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load URLs from localStorage');
      }
    }
  }, []);

  // Save to localStorage whenever urls change
  useEffect(() => {
    localStorage.setItem('shortened-urls', JSON.stringify(urls));
  }, [urls]);

  // Filter URLs based on search term
  const filteredUrls = useMemo(() => {
    if (!searchTerm) return urls;
    
    return urls.filter(url => 
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [urls, searchTerm]);

  const addUrl = (
    originalUrl: string,
    options?: { customCode?: string; validityMinutes?: number }
  ) => {
    // 5 URL limit (not expired)
    const now = new Date();
    const activeUrls = urls.filter(
      (u) => !u.validUntil || new Date(u.validUntil) > now
    );
    if (activeUrls.length >= 5) {
      alert('You can only have 5 active (not expired) shortened URLs at a time.');
      return;
    }

    // Custom code validation
    let shortUrl = options?.customCode?.trim() || Math.random().toString(36).substring(2, 8);
    if (options?.customCode) {
      if (!/^[a-zA-Z0-9]+$/.test(shortUrl)) {
        alert('Custom shortcode must be alphanumeric.');
        return;
      }
      if (urls.some((u) => u.shortUrl === shortUrl)) {
        alert('Custom shortcode already exists. Please choose another.');
        return;
      }
    } else {
      // Ensure random code is unique
      while (urls.some((u) => u.shortUrl === shortUrl)) {
        shortUrl = Math.random().toString(36).substring(2, 8);
      }
    }

    // Validity period
    const validityMinutes = options?.validityMinutes ?? 30;
    const createdAt = new Date();
    const validUntil = new Date(createdAt.getTime() + validityMinutes * 60000).toISOString();

    const newUrl: UrlData = {
      id: uuidv4(),
      originalUrl,
      shortUrl,
      createdAt: createdAt.toISOString(),
      clicks: 0,
      validUntil,
      customCode: options?.customCode?.trim() || undefined,
    };
    setUrls([newUrl, ...urls]);
    console.log('URL added:', newUrl);
  };

  const deleteUrl = (id: string) => {
    setUrls(urls.filter(url => url.id !== id));
    console.log('URL deleted:', id);
  };

  const incrementClicks = (id: string) => {
    setUrls(urls.map(url => 
      url.id === id ? { ...url, clicks: url.clicks + 1 } : url
    ));
  };

  return (
    <AppContext.Provider value={{
      urls,
      filteredUrls,
      searchTerm,
      addUrl,
      deleteUrl,
      setSearchTerm,
      incrementClicks,
    }}>
      {children}
    </AppContext.Provider>
  );
};