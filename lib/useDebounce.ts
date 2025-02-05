import { useEffect, useRef, useState } from "react";

export default function useDebounce<T>(inputValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const handler = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current);
    }

    handler.current = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);
  }, [inputValue, delay]);

  return debouncedValue;
}
