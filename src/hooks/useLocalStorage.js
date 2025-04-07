import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [storageValue, setStorageValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storageValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storageValue]);

  return [storageValue, setStorageValue];
};
