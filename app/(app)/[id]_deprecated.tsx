import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../styles/global';
import { colors } from '@/styles/colors';


export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams();
  const [activity, setActivity] = useState<any>(null);

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

      <View style={globalStyles.cardDetailed}>
        <View style={globalStyles.cardRow}>
          <Image source={{ uri: mainPhoto }} style={globalStyles.cardMainImage} />
          <View style={{ marginLeft: 12 }}>
            <Text style={globalStyles.cardTitle}>{activity.name}</Text>
            <Text style={globalStyles.cardSub}>📍 {baseLocation.latitude.toFixed(4)}°N</Text>
            <Text style={globalStyles.cardSub}>   {Math.abs(baseLocation.longitude.toFixed(4))}°W</Text>
          </View>
        </View>
      </View>
      <FlatList
          horizontal
          data={activity.photos}
          keyExtractor={(_, i) => `${i}`}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={globalStyles.thumbnail} />
          )}
          style={globalStyles.pictureListDetail}
        />

        <TouchableOpacity style={globalStyles.fab}>
          <Feather name="user" style={globalStyles.feather} />
        </TouchableOpacity>
    </View>
  );
  
}
