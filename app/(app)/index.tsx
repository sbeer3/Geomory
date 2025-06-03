import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Reanimated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { globalStyles } from '../../styles/global';

export default function HomeScreen() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const storage = getStorage();
  
  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActivities(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (item: any) => {
    try {
      await deleteDoc(doc(db, 'activities', item.id));
      console.log(item);
      if (item.photos?.[0]?.storagePath) {
        console.log('Deleting photo from storage:', item.photos[0].storagePath);
        const imageRef = ref(storage, item.photos[0].storagePath);
        await deleteObject(imageRef);
      }
    } catch (err) {
      console.error('Error deleting activity:', err);
      Alert.alert('Failed to delete activity');
    }
  };

  const renderRightActions = (item: any) => {
    return (
      <TouchableOpacity
        style={globalStyles.deleteButton}
        onPress={() =>
          Alert.alert('Delete', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => handleDelete(item) },
          ])
        }
      >
        <Feather name="trash-2" size={28} color="white" />
        <Text style={globalStyles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
  }

  if (activities.length === 0) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/geomory-8e7e9.firebasestorage.app/o/assets%2FheaderImage.png?alt=media&token=3c5a16f8-63dd-413b-956b-d8182b7abb45' }}
          style={{ width: 350, height: 250, marginBottom: 20 }}
        />
        <TouchableOpacity onPress={() => router.push('/new')} style={globalStyles.button}>
          <Feather name="plus" style={globalStyles.feather} />
          <Text style={globalStyles.buttonText}> New Memory</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={() => router.push('/new')} style={globalStyles.button}>
        <Feather name="plus" style={globalStyles.feather} />
        <Text style={globalStyles.buttonText}> New Memory</Text>
      </TouchableOpacity>

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GestureHandlerRootView>
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <TouchableOpacity style={globalStyles.card} onPress={() => router.push(`/${item.id}`)}>
                {item.photos?.[0]?.uri && (
                  <Image source={{ uri: item.photos[0].uri }} style={globalStyles.cardImage} />
                )}
                <View style={globalStyles.info}>
                  <Text style={globalStyles.title}>{item.name}</Text>
                  <Text style={globalStyles.subtitle}>
                    <Feather name="map-pin" /> {item.baseLocation.city}, {item.baseLocation.state}
                  </Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          </GestureHandlerRootView>
        )}
      />

      <TouchableOpacity onPress={() => router.push('/map')} style={globalStyles.fab}>
        <Feather name="map" style={globalStyles.feather} />
      </TouchableOpacity>
    </View>
  );
}
