import React, { useCallback, useEffect } from 'react';
import type { Repo } from '../types';
import useDebouncedValue from '../hooks/useDebouncedValue';

type Props = {
  query: string;
  setQuery: (_q: string) => void;
  setResults: (_r: Repo[] | null) => void;
  setLoading: (_b: boolean) => void;
  setError: (_s: string | null) => void;
  onDone?: (_repos: Repo[] | null, _error?: string) => void;
};


const PER_PAGE = 30;

const SearchInput: React.FC<Props> = ({
  query,
  setQuery,
  setResults,
  setLoading,
  setError,
  onDone
}) => {
  const debouncedQuery = useDebouncedValue(query, 350); // ≥300ms

  const fetchRepos = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults(null);
        setLoading(false);
        setError(null);
        onDone?.(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const encoded = encodeURIComponent(q);
        const url = `https://api.github.com/search/repositories?q=${encoded}&per_page=${PER_PAGE}`;
        const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });

        if (!res.ok) {
          const msg = `HTTP ${res.status} ${res.statusText}`;
          setError(msg);
          setResults([]);
          onDone?.(null, msg);
          return;
        }

        const json = await res.json();
        const items = (json.items ?? []) as Repo[];
        setResults(items);
        onDone?.(items);
      } catch (err: unknown) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = String(err);
      }
      setError(msg);
      setResults([]);
      onDone?.(null, msg);
    }

    },
    [onDone, setError, setLoading, setResults]
  );

  useEffect(() => {
    fetchRepos(debouncedQuery);
  }, [debouncedQuery, fetchRepos]);

  return (
    <div className="search">
      <input
        aria-label="Search GitHub repositories"
        placeholder="Search GitHub repositories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="hint">debounced search (≥300ms)</div>
    </div>
  );
};

export default React.memo(SearchInput);
