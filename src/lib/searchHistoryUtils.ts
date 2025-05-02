// src/lib/searchHistoryUtils.ts
export interface SearchHistoryEntry {
    query: string;
    timestamp: number;
  }
  
  const HISTORY_KEY = 'searchHistory';
  const MAX_HISTORY_ITEMS = 10;
  
  /** Loads search history from localStorage */
  export const loadSearchHistory = (): SearchHistoryEntry[] => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Error loading search history:", error);
      return []; // Return empty array on error
    }
  };
  
  /** Saves search history to localStorage */
  const saveSearchHistory = (history: SearchHistoryEntry[]): void => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };
  
  /** Adds a new entry, handles deduplication and limits size */
  export const addSearchHistoryEntry = (
      currentHistory: SearchHistoryEntry[],
      query: string
  ): SearchHistoryEntry[] => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return currentHistory; // Don't add empty queries
  
    const newEntry: SearchHistoryEntry = { query: trimmedQuery, timestamp: Date.now() };
  
    // Remove existing entry with the same query, then add the new one to the top
    const updatedHistory = [
      newEntry,
      ...currentHistory.filter((h) => h.query !== trimmedQuery),
    ].slice(0, MAX_HISTORY_ITEMS); // Limit to max items
  
    saveSearchHistory(updatedHistory); // Save the updated history
    return updatedHistory; // Return the new state
  };
  
  /** Removes a specific entry by timestamp */
  export const removeSearchHistoryEntry = (
      currentHistory: SearchHistoryEntry[],
      timestamp: number
  ): SearchHistoryEntry[] => {
    const updatedHistory = currentHistory.filter((h) => h.timestamp !== timestamp);
    saveSearchHistory(updatedHistory);
    return updatedHistory;
  };
  
  /** Clears all search history */
  export const clearAllSearchHistory = (): SearchHistoryEntry[] => {
    saveSearchHistory([]); // Save an empty array
    return []; // Return empty array for state update
  };