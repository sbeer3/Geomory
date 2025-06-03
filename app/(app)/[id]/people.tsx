import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
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
  return (
    <View style={{flex: 1, backgroundColor:colors.background}}>
      <Text>Photos for Memory ID: {id}</Text>
      {/* render your images list here */}
    </View>
  );
}