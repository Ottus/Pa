# Parcelo — Firebase Console Setup & Configuration Guide

This guide walks you step-by-step through setting up your Firebase project for **Parcelo Phase 1**.

---

## 1. What You Need from Firebase Console

Parcelo connects to a single Firebase backend. You will need:
1. **Firebase Web App Config** (API key, Project ID, Storage Bucket, etc.) -> goes into `.env`
2. **Firebase Authentication** (Email/Password provider enabled)
3. **Cloud Firestore** database (Production mode)
4. **Cloud Storage** bucket (for proof-of-delivery photos)
5. **Firebase Admin Service Account** (optional for local admin bootstrap script)

---

## 2. Step-by-Step Console Walkthrough

### Step A: Create or Select Your Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or select an existing one).
3. Name it `parcelo-dev` (or any name you prefer).
4. Google Analytics is optional (can be disabled). Click **Create project**.

### Step B: Register the Web App to Get Keys
1. In the Project Overview page, click the **Web icon** (`</>`) to add a web application.
2. App nickname: `Parcelo Web`.
3. Check the box for **"Also set up Firebase Hosting"**.
4. Click **Register app**.
5. Firebase will display `firebaseConfig` with credentials that look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "parcelo-dev.firebaseapp.com",
     projectId: "parcelo-dev",
     storageBucket: "parcelo-dev.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890"
   };
   ```
6. Copy these values into your `.env` file (or `apps/customer/.env` and `apps/ops/.env`).

### Step C: Enable Authentication
1. In the left sidebar, click **Build > Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, click **Email/Password**.
4. Enable the first toggle (**Email/Password**). Keep *Email link (passwordless sign-in)* disabled.
5. Click **Save**.

### Step D: Create Cloud Firestore Database
1. In the left sidebar, click **Build > Firestore Database**.
2. Click **Create database**.
3. Choose your database location (e.g. `europe-west1` or `us-central1`).
4. Select **Start in production mode** (our repository provides hardened `firestore.rules`).
5. Click **Create**.

### Step E: Enable Cloud Storage
1. In the left sidebar, click **Build > Storage**.
2. Click **Get Started**.
3. Choose **Start in production mode** (our repository provides `storage.rules`).
4. Select the same region as Firestore.
5. Click **Done**.

### Step F: Create the First Admin Account
Per Parcelo's security model, public registration creates **customers only**. The very first admin account must be created securely:
1. In Firebase Console > **Authentication > Users**, click **Add user**.
2. Enter an admin email (e.g. `admin@parcelo.com`) and a strong password (minimum 8 characters).
3. After creating the user, copy their **UID**.
4. Set their custom claim `role: "admin"` using the included bootstrap script:
   ```bash
   npm run bootstrap:admin -- --uid YOUR_COPIED_UID
   ```
   *(Or download a service account key from Project Settings > Service Accounts > Generate new private key).*

---

## 3. Environment Variables Quick Reference

In `apps/customer/.env` and `apps/ops/.env`:

| Key | Example Value | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | `AIzaSyD...` | Public web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `parcelo-dev.firebaseapp.com` | Auth redirect domain |
| `VITE_FIREBASE_PROJECT_ID` | `parcelo-dev` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `parcelo-dev.appspot.com` | Cloud Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789012` | FCM sender ID |
| `VITE_FIREBASE_APP_ID` | `1:123456789012:web:...` | Unique web app ID |
| `VITE_USE_FIREBASE_EMULATOR` | `false` | `true` when testing against local emulators |
| `VITE_CUSTOMER_APP_URL` | `http://localhost:3000` | Customer Web App origin |
| `VITE_OPS_APP_URL` | `http://localhost:3001` | Ops Admin Dashboard origin |

> **Security Note**: Never commit `.env` or `service-account.json` to Git. The `.gitignore` is pre-configured to keep them safe.
