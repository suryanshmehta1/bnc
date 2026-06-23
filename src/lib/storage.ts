/**
 * Safe storage utility wrapper to prevent SecurityErrors when accessing 
 * localStorage or sessionStorage in restricted sandbox/iframe environments.
 */

export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      return typeof window !== 'undefined' && window.sessionStorage ? sessionStorage.getItem(key) : null;
    } catch (e) {
      console.warn(`[Storage] Reading '${key}' from sessionStorage is blocked:`, e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`[Storage] Writing '${key}' to sessionStorage is blocked:`, e);
    }
  }
};

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      return typeof window !== 'undefined' && window.localStorage ? localStorage.getItem(key) : null;
    } catch (e) {
      console.warn(`[Storage] Reading '${key}' from localStorage is blocked:`, e);
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`[Storage] Writing '${key}' to localStorage is blocked:`, e);
    }
  }
};
