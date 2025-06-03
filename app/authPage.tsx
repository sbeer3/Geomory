import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { globalStyles } from '../styles/global'; // ✅ adjust path as needed

import { auth } from '../lib/firebase'

// const auth = getAuth();

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('AuthScreen mounted');
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/'); // Redirect if already signed in
      }
    });
    return unsub;
  }, []);

  const handleAuth = async () => {
    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace('/'); // Redirect after login/signup
    } catch (error: any) {
      Alert.alert('Authentication Failed', error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>{isSigningUp ? 'Sign Up' : 'Sign In'}</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={globalStyles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={globalStyles.input}
      />

      <Button title={isSigningUp ? 'Create Account' : 'Log In'} onPress={handleAuth} />

      {/* <TouchableOpacity onPress={() => setIsSigningUp(!isSigningUp)}>
        <Text style={globalStyles.toggle}>
          {isSigningUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}
