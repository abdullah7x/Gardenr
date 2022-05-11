import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { db } from '../firebase2';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ActivityIndicator, Colors } from 'react-native-paper';

const ViewDetailsScreen = () => {
  const [currDetails, setCurrDetails] = useState({});
  const auth = getAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const handleChat = () => {
    navigation.navigate('Conversations');
  };

  const handleMap = () => {
    navigation.navigate('Map');
  };

  const navEditDetails = () => {
    navigation.navigate('Edit Details');
  };

  const colRef = collection(db, 'gardeners');
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
          <Text style={styles.welcomeText}>Hello {firstName}!</Text>
          <Text style={styles.greenText}>Welcome to Gardenr.</Text>
          <Text style={styles.subText}>
            Here you can send and view messages with potential clients to
            organise a job, view a map of recent searches in your area, and edit
            your company details.
          </Text>
          <TouchableOpacity onPress={handleMap} style={styles.button}>
            <Text style={styles.buttonText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChat} style={styles.button}>
            <Text style={styles.buttonText}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navEditDetails} style={styles.button}>
            <Text style={styles.buttonText}>Edit details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOut}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
};
export default ViewDetailsScreen;
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
  Text: {
    color: 'black',
    fontWeight: '700',
    fontSize: 17,
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
});
