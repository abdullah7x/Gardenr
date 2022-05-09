import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase2';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  const { paramKey } = route.params;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const handleMessages = () => {
    navigation.navigate('Client Messages');
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out {paramKey}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMessages} style={styles.button}>
        <Text style={styles.buttonText}>Messages</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
