import { useState, useEffect } from 'react';

const usePersistedState = (key: string, initialValue: string) => {
  const [state, setState] = useState(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState] as const;
};

export default usePersistedState;
