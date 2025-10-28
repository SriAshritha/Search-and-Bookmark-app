# ⚡ GitHub Repository Search & Bookmark App

A compact, production-ready **React + TypeScript** application that implements a **real-time debounced GitHub repository search** and a **persistent bookmarking system**.

---

## 🧩 Core Strategy

The code is designed around **three engineering principles**:

1. **Data Responsiveness** – smooth, network-efficient search using debounce and async concurrency control.  
2. **Code Scalability** – modular, independent components coordinated by a Context + Reducer store.  
3. **Performance Stability** – controlled render cycles using `React.memo`, `useCallback`, and `useMemo`.

Everything is built using **native React APIs** — no external state libraries, no UI frameworks — ensuring clarity, transparency, and testability.

---

## ⚙️ Functional Overview

- **Real-Time Repository Search**  
  - Integrates GitHub’s public `/search/repositories` REST endpoint.  
  - Debounce (350 ms) applied via custom hook `useDebouncedValue`.  
  - Async calls handled with `fetch` and `async/await`.  
  - Graceful empty, loading, and error states.

- **Bookmark Management**  
  - Each card includes a ★ toggle for bookmarking.  
  - Bookmarks persist automatically in `localStorage` using `useEffect`.  
  - Bookmarked-only filter works instantly without additional network calls.

- **Performance Optimization**  
  - `React.memo` used across key components to avoid unnecessary re-renders.  
  - Derived lists computed with `useMemo` for stable references.  
  - Event handlers stabilized with `useCallback`.

---

## 🧱 File-Level Responsibilities

| File | Responsibility |
|------|----------------|
| **App.tsx** | Root component; orchestrates search, filters, and context data |
| **SearchInput.tsx** | Debounced search + API logic + loading/error handling |
| **RepoList.tsx** | Stateless list renderer |
| **RepoCard.tsx** | Individual repo details + bookmark control |
| **BookmarksContext.tsx** | Global state store (Context + Reducer) with `localStorage` sync |
| **useDebouncedValue.ts** | Custom debounce logic (delay + cleanup) |

---

## 🧠 Unique Implementation Highlights

### 1️⃣ Debounced Asynchronous Search  
Custom hook `useDebouncedValue` delays API calls until user input stabilizes for 350 ms.  
This avoids redundant network requests and UI flicker.

**Advantage:** Efficient async control and responsive UX.

### 2️⃣ Context + Reducer State Architecture  
All bookmark actions (`ADD`, `REMOVE`, `INIT`) are funneled through a reducer, ensuring predictable updates.

**Advantage:** Deterministic state transitions, easy debugging, and clean separation from UI logic.

### 3️⃣ Derived Rendering Pipeline  
Filtering logic resides at the top level (`App.tsx`), while children (`RepoList`, `RepoCard`) remain pure components.

**Advantage:** Zero duplicated state; predictable re-render flow.

### 4️⃣ Local Persistence  
`BookmarksContext` syncs with `localStorage` in an effect, restoring data automatically on reload.

**Advantage:** Offline persistence without backend or libraries.

### 5️⃣ Controlled Render Cycle  
Components and handlers are memoized to keep the UI reactive even with large search results.

**Advantage:** Stable frame rate and fast state propagation.

---

## 🔧 Installation, Run, Test & Build

### 1️⃣ Clone this repository
```bash
git clone https://github.com/yourusername/github-search-bookmarks.git
cd github-search-bookmarks

```
2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Run the development server
```bash
npm run dev
```

Then open [http://localhost:5173](link to the website)
 in your browser.

4️⃣ Lint
```bash
npm run lint
```


### 🧪 Unit Testing

Unit testing can be extended using **React Testing Library** or **Vitest**.  
A placeholder test configuration can be added later in `/tests`.  
Recommended coverage:
- Search input debounce behavior
- Reducer logic (`ADD`, `REMOVE`, `INIT`)
- LocalStorage persistence
- Rendering of bookmarked vs. unbookmarked states

---

## 🔍 Technical Advantages

| **Focus Area** | **Implementation** | **Advantage** |
|----------------|--------------------|----------------|
| **Async Control** | Debounced `fetch()` calls via `useDebouncedValue` | Prevents overlapping network requests |
| **State Management** | Context + Reducer | Centralized, predictable updates |
| **Persistence** | LocalStorage + Effect Sync | Offline data retention |
| **Performance** | `React.memo`, `useCallback`, `useMemo` | Smooth rendering |
| **Scalability** | Prop-based pure components | Reusable, extendable design |
| **Tooling** | Vite + TypeScript + ESLint + Prettier | Modern, fast, type-safe setup |

---

## ⚙️ Decisions & Trade-offs

| **Decision** | **Rationale** | **Trade-off** |
|---------------|---------------|---------------|
| **Used Context + Reducer instead of Redux** | Lightweight and sufficient for local state; easy to extend later | Limited dev tooling compared to Redux |
| **Custom debounce hook** | Full control over timing and cleanup | Slightly more manual implementation |
| **No UI library (Material/Tailwind)** | Maintains transparency and minimal bundle size | Less visual polish |
| **LocalStorage persistence** | Quick, stateless way to save user data | Not shareable across devices |
| **Vite build setup** | Extremely fast dev + optimized build | Less conventional than CRA for beginners |

---

## 🔮 Possible Next Steps

1. **Pagination or Infinite Scroll** – extend API calls with page parameters.  
2. **Dark/Light Theme Switch** – add CSS variables + context-based theming.  
3. **GitHub OAuth Integration** – authenticated bookmarks and user repositories.  
4. **Unit Tests** – coverage for search, bookmarking, and reducer logic.  
5. **Deployment** – deploy on Vercel/Netlify for production demo.
