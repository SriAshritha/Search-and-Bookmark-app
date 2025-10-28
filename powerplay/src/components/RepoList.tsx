import React from 'react';
import type { Repo } from '../types';
import RepoCard from './RepoCard';

type Props = { repos: Repo[] };

const RepoList: React.FC<Props> = ({ repos }) => {
  if (!repos || repos.length === 0) {
    return <div className="state">No results</div>;
  }

  return (
    <ul className="repo-list">
      {repos.map((r) => (
        <li key={r.id}>
          <RepoCard repo={r} />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(RepoList);
