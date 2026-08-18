# Security Documentation — PMS Finance

## Overview

This document describes the role-based access control (RBAC) system implemented
in the PMS Finance application. The system enforces authentication and
authorization on both the client side (route guards) and the server side (login
API with PostgreSQL).

---

## Architecture

```
Browser (React SPA)
  │
  ├── AuthProvider (context)  ── reads/writes localStorage
  │     └── useAuth() hook    ── exposes user, login(), logout(), hasRole()
  │
  ├── ProtectedRoute wrapper  ── checks auth + role before rendering
  │     └── routes.tsx        ── every route declares allowedRoles
  │
  └── app-sidebar.tsx         ── filters sidebar items by role

Server (Express + PostgreSQL)
  │
  └── POST /api/login         ── validates credentials, returns role
```

---

## Roles

Three roles are defined in `src/contexts/auth-context.tsx`:

| Role       | Constant          | Description                          |
|------------|-------------------|--------------------------------------|
| Admin      | `ROLES.ADMIN`     | Full access to all 11 modules        |
| Accountant | `ROLES.ACCOUNTANT`| Access to 10 modules (no Cashier)    |
| Cashier    | `ROLES.CASHIER`   | Access to 2 modules (Cashier + Cash) |

---

## Files Involved

| File | Purpose |
|------|---------|
| `src/contexts/auth-context.tsx` | AuthProvider, useAuth hook, role constants, localStorage management |
| `src/components/protected-route.tsx` | Route guard component — checks auth + role |
| `src/config/routes.tsx` | Route definitions with `allowedRoles` per route |
| `src/App.tsx` | Wraps app tree with `<AuthProvider>` |
| `src/components/app-sidebar.tsx` | Role-based sidebar filtering |
| `server/index.js` | Login API endpoint, PostgreSQL user table |

---

## Authentication Flow

### 1. Login

```
User submits email + password
        │
        ▼
POST /api/login  (server/index.js)
        │
        ├── Validates input (non-empty email/password)
        ├── Queries PostgreSQL: SELECT id, email, role FROM users
        │   WHERE email = $1 AND password = $2
        ├── Returns 401 if no match
        └── Returns { user: { id, email, role } } on success
        │
        ▼
Frontend (login-form-3.tsx)
        │
        ├── Calls useAuth().login({ email, role })
        │   └── Writes to localStorage under key "pms-finance-user"
        ├── Navigates to role-specific portal:
        │     Admin     → /admin
        │     Cashier   → /cashier
        │     Accountant→ /accountant
        └── Done
```

### 2. Session Persistence

On app load, `AuthProvider` reads from `localStorage`:

```typescript
// src/contexts/auth-context.tsx
function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem('pms-finance-user')
  // Parses JSON, normalizes role casing, returns AuthUser or null
}
```

- If valid data exists → user is considered authenticated
- If missing or corrupted → user is `null` → redirected to login

### 3. Logout

```typescript
localStorage.removeItem('pms-finance-user')
setUser(null)
```

---

## Authorization (Route Protection)

### ProtectedRoute Component

`src/components/protected-route.tsx` wraps every protected route:

```tsx
<ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
  <Dashboard />
</ProtectedRoute>
```

**Logic:**

1. If `isLoading` → show spinner (avoid flash redirect)
2. If `user` is `null` → redirect to `/auth/sign-in-3`
3. If `allowedRoles` is set and user's role is not in the list → redirect to `/errors/unauthorized`
4. Otherwise → render children

### Route Access Matrix

| Route | Admin | Accountant | Cashier |
|-------|:-----:|:----------:|:-------:|
| `/admin` | ✓ | | |
| `/accountant` | | ✓ | |
| `/cashier` | ✓ | | ✓ |
| `/dashboard`, `/dashboard-2` | ✓ | | |
| `/general-ledger` | ✓ | ✓ | |
| `/accounts-payable` | ✓ | ✓ | |
| `/accounts-receivable` | ✓ | ✓ | |
| `/disbursement-management` | ✓ | ✓ | |
| `/collection-management` | ✓ | ✓ | |
| `/budget-management` | ✓ | ✓ | |
| `/cash-management` | ✓ | ✓ | ✓ |
| `/financial-reporting-analytics` | ✓ | ✓ | |
| `/tax-management` | ✓ | ✓ | |
| `/account-ss` | ✓ | ✓ | |
| `/users` | ✓ | | |
| `/mail`, `/tasks`, `/chat`, `/calendar` | ✓ | ✓ | ✓ |
| `/settings/*` | ✓ | ✓ | ✓ |
| `/faqs`, `/pricing` | ✓ | ✓ | ✓ |
| Auth pages (`/auth/*`) | Public | Public | Public |
| Error pages (`/errors/*`) | Public | Public | Public |
| `/landing` | Public | Public | Public |

---

## Sidebar Filtering

`src/components/app-sidebar.tsx` reads the user's role via `useAuth()` and
filters the "Sub Modules" navigation group:

- **Admin** → all 11 modules shown
- **Accountant** → 10 modules (Cashier Terminal hidden)
- **Cashier** → 2 modules (Cashier Terminal + Cash Management)

The sidebar header label also updates per role:
- "Admin Dashboard" / "Accountant Portal" / "Cashier Terminal"

The logo links to the correct home portal per role.

---

## Server-Side Security

### Database Schema (`server/index.js`)

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Login Endpoint

```
POST /api/login
Body: { email: string, password: string }
Response: { success: true, user: { id, email, role } }
Error:    { message: string }  // 400, 401, or 500
```

- Input is sanitized (trimmed, lowercased for email)
- Role is normalized (first letter capitalized) in the response
- Uses parameterized queries (`$1`, `$2`) — safe against SQL injection
- No session/JWT is issued; auth state is managed client-side via localStorage

---

## Known Limitations

1. **No server-side session management** — The API returns the role but does not
   issue a JWT or session token. Authorization is enforced only on the client.
   A determined user could modify `localStorage` to escalate privileges.

2. **Passwords stored in plaintext** — The `password` column stores the raw
   password. In production, passwords should be hashed with bcrypt or argon2.

3. **CORS is fully open** — `app.use(cors())` allows any origin. In production,
   restrict to the frontend domain.

4. **Client-side only route guards** — `ProtectedRoute` prevents rendering but
   does not prevent direct API calls. Sensitive operations should also validate
   the user's role server-side.

5. **No CSRF protection** — The login API does not use CSRF tokens.

---

## Recommended Production Improvements

- [ ] Hash passwords with bcrypt before storing
- [ ] Issue JWT or session cookies on login; validate on every API request
- [ ] Add server-side authorization middleware to all API endpoints
- [ ] Restrict CORS to the production frontend domain
- [ ] Add rate limiting to `/api/login` to prevent brute-force attacks
- [ ] Add CSRF tokens for state-changing requests
- [ ] Store session expiry and auto-logout after inactivity
