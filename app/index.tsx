import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from 'expo-router';
import { globalStyles } from '../styles/global'; // ✅ adjust path as needed
import { Feather } from '@expo/vector-icons'; // or Ionicons, MaterialIcons
import * as Location from 'expo-location';

export default function HomeScreen() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (activities.length ==0) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image
          source={{ uri: "https://firebasestorage.googleapis.com/v0/b/geomory-8e7e9.firebasestorage.app/o/assets%2FheaderImage.png?alt=media&token=3c5a16f8-63dd-413b-956b-d8182b7abb45" }} // ✅ you can design or grab a cute PNG (like a little backpack guy, campfire, etc)
          style={{ width: 350, height: 250, marginBottom: 20 }}
        />
        <TouchableOpacity onPress={() => router.push('/new')} style={globalStyles.button}>
          <Feather name="plus" style={globalStyles.feather} /><Text style={globalStyles.buttonText}> New Memory</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={() => router.push('/new')} style={globalStyles.button}>
        <Feather name="plus" style={globalStyles.feather} /><Text style={globalStyles.buttonText}> New Memory</Text>
      </TouchableOpacity>

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={activities}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={() => router.push(`/${item.id}`)}
          >
            {item.photos?.[0]?.uri && (
              <Image
                source={{ uri: item.photos[0].uri }}
                style={globalStyles.cardImage}
              />
            )}
            <View style={globalStyles.info}>
              <Text style={globalStyles.title}>{item.name}</Text>
              <Text style={globalStyles.subtitle}>
               <Feather name="map-pin"/> {item.baseLocation.city}, {item.baseLocation.state}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    <TouchableOpacity
      onPress={() => router.push('/map')}
      style={globalStyles.fab}
    >
      <Feather name="map" style={globalStyles.feather} />
    </TouchableOpacity>
    </View>
  );
}