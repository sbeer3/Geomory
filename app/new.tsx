import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import MapView, { Marker, Callout, MapPressEvent } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';

import { db, storage } from '../lib/firebase';
import { globalStyles } from '../styles/global';
import { colors } from '../styles/colors';
import { useAuth } from '../lib/authContext';

import * as Location from 'expo-location';




type ActivityPhoto = {
  uri: string;
  latitude: number | 0;
  longitude: number | 0;
  caption: string;
};
export default function NewActivityScreen() {
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState<ActivityPhoto | null>(null);
  const [manualLocation, setManualLocation] = useState<null | { latitude: number; longitude: number }>(null);

  const router = useRouter();
const { user, loading } = useAuth();
const handlePickPhoto = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    exif: true,
  });

  if (!result.canceled && result.assets.length > 0) {
    const asset = result.assets[0];
    const exif = asset.exif;

    let latitude = 0; // fallback
    let longitude = 0;

    if (exif?.GPSLatitude && exif?.GPSLongitude) {
      const lat = exif.GPSLatitude;
      const lng = exif.GPSLongitude;
      const latRef = exif.GPSLatitudeRef;
      const lngRef = exif.GPSLongitudeRef;

      latitude = latRef === 'S' ? -Math.abs(lat) : Math.abs(lat);
      longitude = lngRef === 'W' ? -Math.abs(lng) : Math.abs(lng);
    }

    setPhoto({
      uri: asset.uri,
      latitude,
      longitude,
      caption: '',
    });

    setManualLocation(null);
  }
};

  const handleMapPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setManualLocation({ latitude, longitude });
    setPhoto(prev =>
      prev
        ? {
            ...prev,
            latitude,
            longitude,
          }
        : prev
    );
  };

  const handleCreate = async () => {
    if (!title || !photo) {
      Alert.alert('Missing info', 'Please enter a name and pick a photo.');
      return;
    }

    const latitude = photo.latitude ?? manualLocation?.latitude;
    const longitude = photo.longitude ?? manualLocation?.longitude;

    if (!latitude|| !longitude) {
      Alert.alert('Missing location', 'Please tap on the map to set the activity location.');
      return;
    }

    try {
      const response = await fetch(photo.uri);
      const blob = await response.blob();

      const photoId = uuid.v4() as string;
      const storageRef = ref(storage, `photos/${photoId}.jpg`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      const loc = await Location.reverseGeocodeAsync({ latitude, longitude });
      let city: string = "unknown";
      let region: string = "unknown";
      let country: string = "unknown";
      if (loc.length > 0) {
        city = loc[0].city!;
        region = loc[0].region!;
        country = loc[0].country!;
      }
      const docRef = await addDoc(collection(db, 'activities'), {
        name: title,
        userId: user!.uid, // Replace with actual user ID
        baseLocation: {
          latitude: latitude,
          longitude: longitude,
          city: city,
          country: country,
          state: region,
        },
        photos: [
          {
            uri: downloadURL,
            caption: photo.caption,
            latitude: latitude,
            longitude: longitude,
          },
        ],
        createdAt: Date.now(),
      });

      router.push(`/${docRef.id}`);
    } catch (e) {
      console.error('Error uploading photo or creating activity:', e);
      Alert.alert('Error', 'Could not create activity.');
    }
  };

  const hasGPS = photo?.latitude && photo?.longitude;

  return (
    <View style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="Activity Name"
        placeholderTextColor={colors.textSecondary}
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity onPress={handlePickPhoto} style={globalStyles.button}>
        <Text style={globalStyles.buttonText}>Pick a Photo</Text>
      </TouchableOpacity>

      {photo && (
        <View style={{ marginTop: 16 }}>
          <MapView
            style={globalStyles.map}
            initialRegion={{
              latitude: hasGPS ? photo.latitude : 38.7046,
              longitude: hasGPS ? (photo.longitude) : -106.5348,
              latitudeDelta: hasGPS ? 0.01 : 100,
              longitudeDelta: hasGPS ? 0.01 : 100,
            }}
            onPress={handleMapPress}
          >
            {(hasGPS || manualLocation) && (
              <Marker
                coordinate={
                  hasGPS
                    ? { latitude: photo.latitude, longitude: photo.longitude }
                    : manualLocation!
                }
              >
                  <Image
                    source={{ uri: photo.uri }}
                    style={globalStyles.photoMarker}
                  />
              </Marker>
            )}
          </MapView>
        </View>
      )}

      <TouchableOpacity onPress={handleCreate} style={globalStyles.fab}>
        <Feather name="plus" size={24} style={globalStyles.feather} />
      </TouchableOpacity>
    </View>
  );
}
