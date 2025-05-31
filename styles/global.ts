import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { View, Text, Dimensions } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.greenPrimary,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
  },
  input: {
    fontFamily: 'Quicksand-Regular',
    borderRadius: 14,
    padding: 14,
    backgroundColor: colors.surface,
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.greenPrimary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    marginBottom: 20,
    height: 75,
    justifyContent: 'center',   // centers vertically
    flexDirection: 'row',       // optional: use this if you add icons later

  },
  map: {

        height: 250,
        borderRadius: 14,
        
  },
  mapDetail: {
    height: 500,
    position:'relative',
  },
  buttonText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'Quicksand-Bold',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    fontFamily: 'Quicksand-Bold',
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 8,
    fontFamily: 'Quicksand-Regular',
  },
  info: {
    // fontSize: 14,
    // color: colors.border,
  },
  card: {
    flexDirection: 'row', // 🧭 horizontal layout
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },

  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  fab: {
  position: 'absolute',
  bottom: 30,
  right: 20,
  backgroundColor: colors.greenPrimary,
  width: 56,
  height: 56,
  borderRadius: 28,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 4 },
  elevation: 5, // Android shadow
},
feather: {
  color: colors.textPrimary,
  fontSize: 24,
},

callout: {
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 8,
  width: 120,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

calloutImage: {
  width: 100,
  height: 70,
  borderRadius: 6,
  marginBottom: 4,
},

calloutText: {
  fontSize: 12,
  color: colors.textPrimary,
  textAlign: 'center',
},

photoMarker: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: 'white',
  backgroundColor: colors.surface,
  resizeMode: 'cover',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 4, // for Android shadow
},


  cardDetailed: {
    // bottom: 20,
    // left: 16,
    // right: 16,
    backgroundColor: colors.surface,
    borderRadius: 13,
    padding: 16,
    elevation: 5,
    height: 150,
    justifyContent: 'center', // centers vertically
    width: '90%',
    alignSelf: 'center',
    zIndex: 1, // ensures it appears above the map
    position: 'absolute', // allows it to overlay the map
    top: 450, // adjust as needed
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMainImage: {
    width: 110,
    height: 110,
    borderRadius: 12,
    justifyContent: 'center',   // centers vertically
    flexDirection: 'row',       // optional: use this if you add icons later
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
    fontFamily: 'Quicksand-Bold',
  },
  cardSub: {
    fontSize: 13,
    color: '#6b6b6b',
    marginTop: 2,
    fontFamily: 'Quicksand-Regular',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4c6e57',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureListDetail: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    top: 600, // adjust as needed
    
  },

});


