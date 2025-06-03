import { Tabs, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '@/styles/global';
import { colors } from '@/styles/colors';
import { View } from 'react-native';
import ActivityDetailsBreakdown from '../../components/ActivityDetailsBreakdown';
import { Pressable } from 'react-native'; 
import { useRouter } from 'expo-router';
import UserHeaderButton from '../../components/UserHeaderButton';


export default function MemoryTabsLayout() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
    type Props = {
    date: string;
    location: string;
    photoCount: number;
    shared: boolean;
    };

  return (
    // <View style={globalStyles.container}>
    <Tabs screenOptions={({ route, navigation }) => {
        const canGoBack = navigation.canGoBack();
        return {
            headerShown: true,
            headerStyle: {
            backgroundColor: colors.background,
            shadowOpacity: 0,
            },
            headerTitleStyle: {
                color: colors.greenPrimary,
                fontSize: 24,
                fontWeight: 'bold',
                fontFamily: 'Quicksand-Bold',
                 shadowRadius: 0,
                  borderTopWidth: 0,
            },
            tabBarActiveTintColor: colors.danger,
            tabBarActiveBackgroundColor: colors.surface,

            tabBarStyle: {
                backgroundColor: colors.background,
                borderTopColor: colors.background,
                 shadowRadius: 0,
                  borderTopWidth: 0,
            },

            tabBarLabelStyle: {
                fontFamily: 'Quicksand-Bold',
                fontWeight: 'bold',
                fontSize: 12,
            },
            headerLeft: () =>
            canGoBack ? (
              <Pressable onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
                <Feather name="x" size={28} color={colors.greenPrimary} />
              </Pressable>
            ) : (
              <Pressable onPress={() => alert('Open menu')} style={{ paddingLeft: 12 }}>
                <Feather name="user" size={28} color={colors.greenPrimary} />
              </Pressable>
            ),
          headerRight: () => <UserHeaderButton />,
    }
        
    }}>
      <Tabs.Screen
        name="photos"  // this matches index.tsx = Photos tab
        options={{
          title: 'Photos',
          tabBarIcon: ({ color, size }) => (
            <Feather name="image" style={globalStyles.featherTab} />
          ),
        }}
        initialParams={params}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" style={globalStyles.featherTab} />
          ),
        }}
        initialParams={params}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: 'People',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" style={globalStyles.featherTab} />
          ),
        }}
        initialParams={params}
      />
    </Tabs>
    // </View>
  );
}
