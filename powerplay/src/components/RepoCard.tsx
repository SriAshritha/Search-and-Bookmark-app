import React, { useCallback, useMemo } from 'react';
import type { Repo } from '../types';
import { useBookmarks } from '../context/BookmarksContext';

const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  const { bookmarks, add, remove } = useBookmarks();

  const isBookmarked = useMemo(
    () => bookmarks.some((b) => b.id === repo.id),
    [bookmarks, repo.id]
  );

  const toggle = useCallback(() => {
    if (isBookmarked) remove(repo.id);
    else add(repo);
  }, [isBookmarked, remove, add, repo]);

  return (
    <article className="card">
      <div className="card-left">
        <img src={repo.owner.avatar_url} alt={repo.owner.login} className="avatar" />
      </div>
      <div className="card-body">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="title">
          {repo.full_name}
        </a>
        <p className="desc">{repo.description ?? 'No description'}</p>
        <div className="meta">
          <span>★ {repo.stargazers_count}</span>
          <span>{repo.language ?? '—'}</span>
          <a href={repo.owner.html_url} target="_blank" rel="noreferrer">
            @{repo.owner.login}
          </a>
        </div>
      </div>
      <div className="card-actions">
        <button aria-pressed={isBookmarked} onClick={toggle} className="bookmark-btn">
          {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
    </article>
  );
};

export default React.memo(RepoCard);
