import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Returns a debounced copy of the provided value that only changes
 * after the given delay has elapsed without the value being updated.
 *
 * @param value The raw value that may change rapidly
 * @param delay Delay in milliseconds before the debounced value is updated
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
} 