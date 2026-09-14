# Company Next.js Boilerplate

Internal Next.js 16 (App Router) starter with TanStack Query wired in for data
fetching.

> **Next.js 16 has breaking changes from what you may know.** Before writing
> route/data code, see `node_modules/next/dist/docs/` (also linked from
> `AGENTS.md`) — in particular the App Router docs on `PageProps`/`LayoutProps`
> and the TanStack Query guide.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The home page links to
`/users`, a full CRUD demo.

## Scripts

| Script            | Purpose                          |
| ----------------- | -------------------------------- |
| `pnpm dev`        | Start the dev server             |
| `pnpm build`      | Production build                 |
| `pnpm start`      | Start the production server      |
| `pnpm lint`       | ESLint                           |
| `pnpm format`     | Prettier, write mode             |
| `pnpm test`       | Run the test suite once (Vitest) |
| `pnpm test:watch` | Run tests in watch mode          |

A Husky `pre-commit` hook runs `lint-staged` (ESLint + Prettier on staged
files) automatically.

## Data fetching with TanStack Query

`QueryClientProvider` is set up once in `lib/query/providers.tsx` and mounted
in the root layout (`app/layout.tsx`), so any component in the app can use
`useQuery` / `useMutation` without further setup. React Query Devtools are
included in development builds only.

`lib/apiClient.ts` is a small `fetch` wrapper (`apiFetch`) that prefixes
`NEXT_PUBLIC_API_BASE_URL` and throws `ApiError` on non-OK responses. Point
`NEXT_PUBLIC_API_BASE_URL` at your real backend per environment — see
`.env.example`.

### Route groups

Routes are split into `(public)` and `(private)` groups — organizational
only, neither changes the URL:

```
app/
├── (public)/users/                    # -> /users
└── (private)/admin/
    ├── login/                         # -> /admin/login (unguarded)
    └── (protected)/users/             # -> /admin/users (proxy-gated)
```

### Feature module convention

Each route/feature keeps its data layer colocated using private folders
(Next.js never routes anything prefixed with `_`):

```
app/<group>/<feature>/
├── page.tsx                 # renders the client view
├── _interfaces/<name>.ts    # types for this feature
├── _queries/use<Name>.ts    # one useQuery hook per file
├── _mutations/use<Name>.ts  # one useMutation hook per file
└── _components/             # client components using the hooks above
```

`app/(public)/users/` is the reference implementation:

- `_queries/useUsers.ts`, `_queries/useUser.ts` — `useQuery` reads
- `_mutations/useCreateUser.ts`, `useUpdateUser.ts`, `useDeleteUser.ts` —
  `useMutation` writes, each updating the `["users"]` cache from the
  mutation response in `onSuccess`
- `_components/users-view.tsx` — the CRUD UI, plus its test

The demo calls the public [JSONPlaceholder](https://jsonplaceholder.typicode.com)
API (the default `NEXT_PUBLIC_API_BASE_URL`). It fakes writes without
persisting them, which is why mutations update the query cache directly
instead of invalidating and refetching — see the comment in
`useCreateUser.ts`. Swap in your real API and this pattern (or plain
`invalidateQueries`, if your backend actually persists) both work.

## Admin panel

`app/(private)/admin/(protected)/users` is an admin-styled view of the same
users domain — a searchable table plus view/edit/delete/create dialogs —
reusing the exact same `_queries`/`_mutations` hooks from
`app/(public)/users/`, so there's one source of truth for the CRUD logic.
`/users` stays as the simpler public demo.

The admin section is gated by `proxy.ts` (Next.js 16's replacement for
`middleware.ts`), which redirects unauthenticated requests under `/admin` to
`/admin/login`. Sign in with the demo credentials:

```
admin@gmail.com / admin123
```

(configurable via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local`).

**This is a demo-only login**, implemented in `lib/admin-auth.ts`: there is
no user store, no password hashing, and the "session" is a single HMAC-signed
cookie with no expiry/revocation beyond its 8-hour `maxAge`. Do not deploy
this as-is — replace it with real authentication (a user table, hashed
passwords, proper session management) before this admin panel is reachable
from anywhere but a local demo.

## Testing

Vitest + React Testing Library are configured (`vitest.config.mts`,
`vitest-setup.ts`). `test/test-utils.tsx` exports `renderWithQueryClient` for
rendering components that call TanStack Query hooks with a fresh
`QueryClient` per test. See `app/(public)/users/_components/users-view.test.tsx`
for the pattern (mocking `fetch`, asserting query results and mutation
effects).

## Linting & formatting

ESLint (`eslint-config-next` + `eslint-config-prettier` to avoid rule
conflicts) and Prettier (with `prettier-plugin-tailwindcss` for class
ordering) are both configured. Husky + lint-staged run them on staged files
before every commit.

## Environment variables

Copy `.env.example` to `.env.local` and adjust per environment. Only
`NEXT_PUBLIC_*` variables are exposed to the browser.
