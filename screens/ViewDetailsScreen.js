import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { db } from '../firebase2';
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
import { getAuth } from 'firebase/auth';

const ViewDetailsScreen = () => {
  const [currDetails, setCurrDetails] = useState({});
  const auth = getAuth();
  const navigation = useNavigation();

  const handleChat = () => {
    navigation.navigate('GardenerMessages');
  };

  const handleMap = () => {
    navigation.navigate('Map');
  };

  const navEditDetails = () => {
    navigation.navigate('EditDetails', {
      currDetails,
      setCurrDetails,
    });
  };

  const colRef = collection(db, 'gardeners');
  const q = query(colRef, where('email', '==', auth.currentUser.email));
  useEffect(() => {
    getDocs(q).then((snapshot) => {
      setCurrDetails({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
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

  return (
    <View style={styles.container}>
      <Text>Company Name: {currDetails?.companyName}</Text>
      <Text>Name: {currDetails?.name}</Text>
      <Text>Location: {currDetails?.postCode}</Text>
      <Text>Email: {currDetails?.email}</Text>
      <Text>Phone number: {currDetails?.phoneNo}</Text>

      <TouchableOpacity onPress={navEditDetails} style={styles.button}>
        <Text style={styles.buttonText}>Edit details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleChat} style={styles.button}>
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleMap} style={styles.button}>
        <Text style={styles.buttonText}>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
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
