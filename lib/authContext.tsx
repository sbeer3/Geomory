// lib/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { auth } from './firebase'; // ✅ adjust path as needed
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'expo-router';

type AuthContextType = {
  user: User | null;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  loading: boolean;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  uid: null,
  email: null,
  displayName: null,
  loading: true,
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);

      if (!firebaseUser) {
        router.replace('/authPage');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        uid: user?.uid ?? null,
        email: user?.email ?? null,
        displayName: user?.displayName ?? null,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export const useAuth = () => useContext(AuthContext);
