// app/_layout.tsx
import React, { useEffect } from 'react';

import { AuthProvider } from '../lib/authContext';
import { Slot } from 'expo-router';
export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
