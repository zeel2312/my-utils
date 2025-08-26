// useFetchData.ts
import { useState, useEffect } from "react";

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
