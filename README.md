# Parcelo — Next-Generation Logistics Platform (Phase 1)

Parcelo is a next-generation logistics platform for on-demand package booking, real-time public parcel tracking, and administrative operations command.

Built as a lightweight monorepo with **React + Vite**, **Tailwind CSS**, and a unified **Firebase** backend (Authentication, Firestore, Storage, Cloud Functions, and Hosting).

---

## 1. Architecture Overview

```
parcelo/
  apps/
    customer/          # Customer portal & public tracking lookup (port 3000)
    ops/               # Operations admin dashboard (port 3001)
  packages/
    shared/            # Design tokens, theme preset, shared UI components,
                       # status rules, pricing formula, and Firebase client
  firebase/
    functions/src/     # Node.js callable Cloud Functions (getQuote, bookDelivery, etc.)
    firestore.rules    # Production Firestore security rules (default-deny)
    storage.rules      # Cloud Storage security rules (proof photos < 2MB, JPG/PNG)
    firestore.indexes.json
  scripts/             # Admin bootstrap and demo data seeding scripts
  firebase.json        # Hosting targets, rewrites, and security headers (CSP, HSTS)
  .firebaserc          # Project aliases (dev, prod)
```

---

## 2. Key Technology Choices

- **Frontend**: React 18 + Vite, Tailwind CSS with custom Dark Dashboard Theme preset, Lucide icons, Leaflet + OpenStreetMap.
- **Backend**: Firebase Auth (email/password), Cloud Firestore, Cloud Storage, Cloud Functions (callable v2, Zod validation).
- **Security**:
  - Roles enforced exclusively via Firebase Custom Claims (`customer`, `admin`).
  - Strict Firestore security rules (default-deny, zero client writes to quotes, orders, and public tracking).
  - Price and tracking numbers computed strictly server-side.
  - Append-only status timeline events.

---

## 3. Quick Start (Development)

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x

### Installation
```bash
npm install
```

### Running Both Applications Concurrently
```bash
npm run dev
```
- **Customer App**: [http://localhost:3000](http://localhost:3000)
- **Ops Dashboard**: [http://localhost:3001](http://localhost:3001)

### Running Apps Individually
```bash
# Customer app only
npm run dev:customer

# Ops dashboard only
npm run dev:ops
```

---

## 4. Firebase Configuration

1. Copy `.env.example` to `apps/customer/.env` and `apps/ops/.env`.
2. Fill in your project keys from the Firebase Console (refer to `FIREBASE_SETUP_GUIDE.md`).
3. For local emulation:
   ```bash
   npm run emulators
   ```
4. To bootstrap the first Admin user:
   ```bash
   npm run bootstrap:admin -- --uid <TARGET_USER_UID>
   ```

---

## 5. Design System Tokens (Dark Theme)

- **Background**: `#0F172A`
- **Surface**: `#1E293B`
- **Border**: `#334155`
- **Text**: `#F1F5F9`
- **Muted**: `#94A3B8`
- **Teal Accent**: `#14B8A6` (Hover: `#2DD4BF`, Pressed: `#0D9488`)
- **Status Colors**:
  - Pending: Amber `#F59E0B`
  - In Transit: Blue `#3B82F6`
  - Out for Delivery: Purple `#8B5CF6`
  - Delivered: Green `#22C55E`
  - Failed: Red `#EF4444`
- **Typography**: Space Grotesk (Headings), IBM Plex Sans (Body), IBM Plex Mono (Tracking / IDs).
- **Radii**: 12px cards, 8px controls, pill badges.

