import { useAuth } from '../lib/authContext';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { colors } from '../styles/colors';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>Loading user...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>User not signed in.</Text>
      </View>
    );
  }

  return (
    
  <Stack
        screenOptions={({ route, navigation })=> {
          
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
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={{ paddingLeft: 12 }}
                >
                  <Ionicons name="arrow-back-outline" size={28} color={colors.greenPrimary} />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => alert('Open menu')}
                  style={{ paddingLeft: 12 }}
                >
                  <Ionicons name="menu-outline" size={28} color={colors.greenPrimary} />
                </Pressable>
              ),
            
            headerRight: () => (
              <Pressable
                onPress={() => alert('User Name: ' + user.email)}
                style={{ paddingRight: 12 }}
              >
                <Ionicons name="person-circle-outline" size={28} color={colors.greenPrimary} />
              </Pressable>
            ),
          };
        }}
      />
  );
}