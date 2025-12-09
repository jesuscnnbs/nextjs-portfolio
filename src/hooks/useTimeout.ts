import { useCallback, useEffect, useRef } from 'react';

interface UseTimeoutResult {
  reset: () => void;
  clear: () => void;
}

/**
 * Custom hook for handling setTimeout with cleanup
 * @param callback Function to be executed after delay
 * @param delay Delay in milliseconds
 * @returns Object with reset and clear functions
 */
export const useTimeout = (callback: () => void, delay: number): UseTimeoutResult => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // Remember the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    if (delay >= 0) {
      timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  // Clear the timeout
  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  // Reset the timeout
  const reset = useCallback(() => {
    clear();
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay, clear]);

  return { reset, clear };
};
