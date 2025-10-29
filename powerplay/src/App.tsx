import React, { useCallback, useMemo, useState } from 'react';
import { BookmarksProvider, useBookmarks } from './context/BookmarksContext';
import SearchInput from './components/SearchInput';
import RepoList from './components/RepoList';
import type { Repo } from './types';

const AppInner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const { bookmarks } = useBookmarks();

  const handleSearchResults = useCallback((repos: Repo[] | null, err?: string) => {
    setResults(repos);
    setError(err ?? null);
    setLoading(false);
  }, []);

  const shownList = useMemo(() => {
    if (bookmarkedOnly) {
      const ids = new Set(bookmarks.map((b) => b.id));
      return (results ?? []).filter((r) => ids.has(r.id));
    }
    return results ?? [];
  }, [bookmarkedOnly, results, bookmarks]);

  return (
    <div className="container">
      <header className="header">
        <h1>GitHub Repo Search</h1>
        <label className="bookmark-toggle">
          <input
            type="checkbox"
            checked={bookmarkedOnly}
            onChange={(e) => setBookmarkedOnly(e.target.checked)}
          />{' '}
          All Bookmarked only
        </label>
      </header>

      <SearchInput
        query={query}
        setQuery={setQuery}
        setResults={setResults}
        setLoading={setLoading}
        setError={setError}
        onDone={handleSearchResults}
      />

      <main>
        {loading && <div className="state">Loading…</div>}
        {error && <div className="state error">Error: {error}</div>}
        {!loading && !error && (results === null || results.length === 0) && (
          <div className="state">Start typing to search GitHub repositories</div>
        )}
        <RepoList repos={shownList} />
      </main>
      <footer className="footer">
        <small>Search uses GitHub public REST API /search/repositories (first 30 results)</small>
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <BookmarksProvider>
    <AppInner />
  </BookmarksProvider>
);

export default App;
