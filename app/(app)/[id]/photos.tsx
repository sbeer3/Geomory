import { useLocalSearchParams } from 'expo-router';

import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../../../styles/global';
import { colors } from '@/styles/colors';

export default function MemoryPhotos() {
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
  return (
    <View style={{flex: 1, backgroundColor:colors.background}}>
            <FlatList
                
                data={activity.photos}
                keyExtractor={(_, i) => `${i}`}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.uri }} style={globalStyles.thumbnail} />
                        <View style={globalStyles.info}>
                            <Text style={globalStyles.title}>{item.name}</Text>
                            <Text style={globalStyles.subtitle}>
                            
                            </Text>
                        </View>
                    </View>
                        )}
                style={globalStyles.pictureListDetail}
              />
    </View>
  );
}