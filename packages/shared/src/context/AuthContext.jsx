import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/firebaseApp.js';
import { ROLES } from '../constants/roles.js';

const AuthContext = createContext(null);

/**
 * @notice Parcelo Global Authentication Provider
 * @dev Manages user session and claims-based roles.
 * Provides fallback demo authentication when live Firebase API keys are pending.
 */
export function AuthProvider({ children, defaultRole = ROLES.CUSTOMER }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isFirebaseConfigured);

  useEffect(() => {
    // If real Firebase keys are not configured, initialize with Demo Session
    if (!isFirebaseConfigured) {
      console.info('[Parcelo Auth] Running in Mock/Demo Mode with role:', defaultRole);
      const mockUser = {
        uid: 'demo-user-123',
        email: defaultRole === ROLES.ADMIN ? 'admin@parcelo.local' : 'customer@parcelo.local',
        displayName: defaultRole === ROLES.ADMIN ? 'Lead Operations Admin' : 'Demo Customer',
        phone: '+2348012345678',
      };
      setUser(mockUser);
      setRole(defaultRole);
      setLoading(false);
      return;
    }

    // Live Firebase Authentication Listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Force refresh token to obtain custom claims (role)
          const tokenResult = await firebaseUser.getIdTokenResult(true);
          const claimRole = tokenResult.claims.role || ROLES.CUSTOMER;

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Parcelo User',
            phoneNumber: firebaseUser.phoneNumber,
          });
          setRole(claimRole);
        } catch (err) {
          console.warn('[Parcelo Auth] Failed to read custom claims:', err);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
          setRole(ROLES.CUSTOMER);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [defaultRole]);

  // Sign In Action
  const login = async (email, password) => {
    if (!isFirebaseConfigured) {
      // Mock login logic
      const isOps = email.toLowerCase().includes('admin');
      const assignedRole = isOps ? ROLES.ADMIN : ROLES.CUSTOMER;
      const mockUser = {
        uid: `demo-${Date.now()}`,
        email,
        displayName: isOps ? 'Ops Administrator' : 'Customer Account',
      };
      setUser(mockUser);
      setRole(assignedRole);
      return { user: mockUser, role: assignedRole };
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    const tokenResult = await credential.user.getIdTokenResult();
    const claimRole = tokenResult.claims.role || ROLES.CUSTOMER;
    setRole(claimRole);
    return { user: credential.user, role: claimRole };
  };

  // Register Customer Action
  const register = async (email, password, name, phone) => {
    if (!isFirebaseConfigured) {
      // Mock registration logic
      const mockUser = {
        uid: `demo-customer-${Date.now()}`,
        email,
        displayName: name || 'Registered Customer',
        phone,
      };
      setUser(mockUser);
      setRole(ROLES.CUSTOMER);
      return { user: mockUser, role: ROLES.CUSTOMER };
    }

    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(credential.user, { displayName: name });
    }
    // New public registrations are strictly CUSTOMER
    setRole(ROLES.CUSTOMER);
    return { user: credential.user, role: ROLES.CUSTOMER };
  };

  // Sign Out Action
  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setUser(null);
    setRole(null);
  };

  // Demo Role Switcher (Available in development/demo mode)
  const switchDemoRole = (newRole) => {
    console.info(`[Parcelo Auth] Switched demo role to: ${newRole}`);
    if (newRole === null) {
      setUser(null);
      setRole(null);
    } else {
      const isOps = newRole === ROLES.ADMIN;
      setUser({
        uid: `demo-${newRole}-uid`,
        email: isOps ? 'admin@parcelo.local' : 'customer@parcelo.local',
        displayName: isOps ? 'Lead Operations Admin' : 'Demo Customer',
      });
      setRole(newRole);
    }
  };

  const value = {
    user,
    role,
    loading,
    isDemoMode,
    login,
    register,
    logout,
    switchDemoRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * @notice Hook to consume Parcelo Authentication Context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
