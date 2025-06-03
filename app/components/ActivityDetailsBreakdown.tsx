import React from 'react';
import { View, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { globalStyles } from '@/styles/global';

type Props = {
  date: string;
  location: string;
  photoCount: number;
//   shared: boolean;
};

export default function ActivityDetailsBreakdown({ date, location, photoCount}: Props) {
  return (
    <View style={globalStyles.detailsContainer}>
      {/* Date */}
      <View style={globalStyles.detailsItem}>
        <Feather name="calendar" size={16} color={globalStyles.detailsIcon.color} />
        <Text style={globalStyles.detailsText}>{date}</Text>
      </View>

      {/* Location */}
      <View style={globalStyles.detailsItem}>
        <Feather name="map-pin" size={16} color={globalStyles.detailsIcon.color} />
        <Text style={globalStyles.detailsText}>{location}</Text>
      </View>

      {/* Photo count */}
      <View style={globalStyles.detailsItem}>
        <Feather name="image" size={16} color={globalStyles.detailsIcon.color} />
        <Text style={globalStyles.detailsText}>{photoCount} photos</Text>
      </View>

      {/* Shared status */}
      {/* <View style={globalStyles.detailsItem}>
        <Ionicons name="people-outline" size={16} color={globalStyles.detailsIcon.color} />
        <Text style={globalStyles.detailsText}>{shared ? 'Shared' : 'Private'}</Text>
      </View> */}
    </View>
  );
}
