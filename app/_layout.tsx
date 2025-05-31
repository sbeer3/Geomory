import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from '../lib/authContext';
import { colors } from '../styles/colors';
import { useAuth } from '../lib/authContext';
import AppLayout from './AppLayout';
import { useFonts } from 'expo-font';


export default function RootLayout() {

  return (
    <AuthProvider>
      <AppLayout />
    
    </AuthProvider>
  );
}
