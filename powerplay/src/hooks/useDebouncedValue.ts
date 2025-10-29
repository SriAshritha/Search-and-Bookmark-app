import { useEffect, useState } from 'react';

export default function useDebouncedValue<T>(value: T, delay = 300) {
  const [v, setV] = useState<T>(value);

  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return v;
}
