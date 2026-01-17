import { useState, useEffect } from 'react';

/**
 * Hook that returns a debounced version of the provided value
 * Useful for preventing rapid re-renders during slider dragging or fast typing
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
