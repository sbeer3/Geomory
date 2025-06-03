// components/UserHeaderButton.tsx

import React from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../lib/authContext';
import { colors } from '../../styles/colors';

export default function UserHeaderButton() {
  const { user } = useAuth();

  const handlePress = () => {
    alert('User Name: ' + (user?.email ?? 'Unknown'));
  };

  return (
    <Pressable onPress={handlePress} style={{ paddingRight: 12 }}>
      <Ionicons name="person-circle-outline" size={28} color={colors.greenPrimary} />
    </Pressable>
  );
}