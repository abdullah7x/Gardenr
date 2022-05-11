import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  getDocs,
  getDoc,
  doc,
  query,
  where,
  collection,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase2';
import { ActivityIndicator, Colors } from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [currDetails, setCurrDetails] = useState({});
  const [loading, setLoading] = useState(true);

  let firstArr;
  let firstName = 'User';
  const colRef = collection(db, 'clients');
  const q = query(colRef, where('email', '==', auth.currentUser.email));
  useEffect(() => {
    getDocs(q).then((snapshot) => {
      setCurrDetails({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      setLoading(false);
    });
  }, []);

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
    navigation.navigate('Messages');
  };

  const handleEdit = () => {
    navigation.navigate('Edit Profile');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={Colors.green200} />
      </View>
    );
  } else {
    const nameArr = currDetails?.name.split(' ');
    const firstName = nameArr[0];
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/SmallTopBottom.png')}
      >
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Hello {firstName}! </Text>
          <Text style={styles.greenText}>Welcome to Gardenr.</Text>
          <Text style={styles.subText}>
            Here you can search for the perfect Gardenr for your needs, send and
            view messages with Gardenrs to organise a job and edit your personal
            details.
          </Text>

          <TouchableOpacity onPress={handleSearch} style={styles.button}>
            <Text style={styles.buttonText}>Find a Gardenr</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMessages} style={styles.button}>
            <Text style={styles.buttonText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    marginTop: 10,
    maxWidth: '80%',
    textAlign: 'center',
  },
  greenText: {
    fontSize: 16,
    marginTop: 10,
    maxWidth: '80%',
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 40,
    borderColor: 'green',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
});
