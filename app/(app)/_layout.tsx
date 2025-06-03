import { Stack } from 'expo-router';
import UserHeaderButton from '../components/UserHeaderButton';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={({ route, navigation }) => {
        const canGoBack = navigation.canGoBack();
        
        return {
            
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.greenPrimary,
            fontSize: 24,
            fontWeight: 'bold',
            fontFamily: 'Quicksand-Bold',
          },
          headerShadowVisible: false,
          drawerShown: false,
          headerLeft: () =>
            canGoBack ? (
              <Pressable onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
                <Ionicons name="arrow-back-outline" size={28} color={colors.greenPrimary} />
              </Pressable>
            ) : (
              <Pressable onPress={() => alert('Open menu')} style={{ paddingLeft: 12 }}>
                <Ionicons name="menu-outline" size={28} color={colors.greenPrimary} />
              </Pressable>
            ),
          headerRight: () => <UserHeaderButton />,
          
        };
      }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Home' }}
      />
        <Stack.Screen
        name="new"
        options={{ title: 'New Entry' }}
      />

    <Stack.Screen
        name="map"
        options={{ title: 'Memory Map' }}
      />

    <Stack.Screen
      name="[id]"
      options={{ headerShown: false, headerTitle: '', }}
      />
    </Stack>
    
  );
}
