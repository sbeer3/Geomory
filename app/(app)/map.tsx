import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/global';
export default function GlobalMap() {
  const router = useRouter();
    const [activities, setActivities] = useState<any[]>([]);
      const [loading, setLoading] = useState(true);
    
  
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'activities'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivities(data);
      } catch (e) {
        console.error('Error fetching activities:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);
   if (loading) {
     return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
   }
  return (
    <View style={styles.container}>   
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.7946,
          longitude: -106.5348,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
      >
        
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            coordinate={activity.baseLocation}
            onPress={() => router.push(`/${activity.id}`)}
          >
                                  <Image
                        source={{ uri: activity.photos?.[0]?.uri}}
                        style={globalStyles.markerImage}
                      />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
