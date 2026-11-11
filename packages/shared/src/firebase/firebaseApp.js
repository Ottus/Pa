/**
 * @notice Parcelo Firebase Client Initialization
 * @dev Single instance initialization per application. Reads Vite environment variables.
 * Automatically detects whether real credentials or local emulators are configured.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoPlaceholderKeyParcelo2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'parcelo-dev.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'parcelo-dev',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'parcelo-dev.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abcdef1234567890',
};

// Check if credentials are placeholders
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('Placeholder') &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('your_api_key')
);

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

// Connect to Local Emulators if specified
const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';

if (useEmulator && typeof window !== 'undefined' && !window.__FIREBASE_EMULATORS_CONNECTED__) {
  try {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
    connectStorageEmulator(storage, '127.0.0.1', 9199);
    window.__FIREBASE_EMULATORS_CONNECTED__ = true;
    console.info('[Parcelo Firebase] Connected to local Firebase emulators.');
  } catch (err) {
    console.warn('[Parcelo Firebase] Error connecting to emulators:', err.message);
  }
}

