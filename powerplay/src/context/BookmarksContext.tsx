import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react';
import type { Repo } from '../types';

type State = {
  bookmarks: Repo[];
};

type Action =
  | { type: 'INIT'; payload: Repo[] }
  | { type: 'ADD'; payload: Repo }
  | { type: 'REMOVE'; payload: number };

const STORAGE_KEY = 'pp_bookmarks_v1';

const initialState: State = { bookmarks: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return { bookmarks: action.payload };
    case 'ADD':
      if (state.bookmarks.some((r) => r.id === action.payload.id)) return state;
      return { bookmarks: [action.payload, ...state.bookmarks] };
    case 'REMOVE':
      return { bookmarks: state.bookmarks.filter((r) => r.id !== action.payload) };
    default:
      return state;
  }
}

const BookmarksContext = createContext<{
  bookmarks: Repo[];
  add: (_r: Repo) => void;
  remove: (_id: number) => void;
}>({
  bookmarks: [],
  add: () => {},
  remove: () => {}
});

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Repo[];
        dispatch({ type: 'INIT', payload: parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.bookmarks));
    } catch {
      // ignore
    }
  }, [state.bookmarks]);

  const add = useCallback((r: Repo) => dispatch({ type: 'ADD', payload: r }), []);
  const remove = useCallback((id: number) => dispatch({ type: 'REMOVE', payload: id }), []);

  return (
    <BookmarksContext.Provider value={{ bookmarks: state.bookmarks, add, remove }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarksContext);
