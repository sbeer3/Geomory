import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../../styles/global';
import { colors } from '@/styles/colors';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


export default function MemoryPhotos() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<any>(null);
  console.log('MemoryPhotos', id);
  useEffect(() => {
    if (!id) return;

    const loadActivity = async () => {
      const docRef = doc(db, 'activities', id as string);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setActivity(snapshot.data());
      }
    };

    loadActivity();
  }, [id]);

  if (!activity) return <Text>Loading...</Text>;
  const baseLocation = activity.baseLocation;
  const mainPhoto = activity.photos?.[0]?.uri;

  return (
    <View style={{flex: 1, backgroundColor:colors.background}}>
        
            <MapView
        style={globalStyles.mapDetail}
        initialRegion={{
          latitude: baseLocation.latitude,
          longitude: baseLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={baseLocation}>
          <Image
            source={{ uri: mainPhoto }}
            style={globalStyles.markerImage}
          />
        </Marker>
      </MapView>
    </View>
  );
}