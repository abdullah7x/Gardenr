import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase2';
import { ref } from 'firebase/database';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

const GardenerMessages = () => {
  const currentUser = auth.currentUser.email;
  const [friends, setFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [user, setUser] = useState({});

  // work out if current user is a gardener or client so we know which database to listen in with 'where' query using email
  // set friends from database with listener that will update them each time a new one is added
  // friends will then be added into a chat room with 3 properties: user1, user2, messages.
  // map friends into pressable chats with message history
  // users will be added to friends in database side when user clicks message button on gardener page
  // SET USER NEEDS TO BE FIXED AS 35 AND 51 AREN'T CHANGING IT

  useEffect(() => {
    const clientsColRef = collection(db, 'clients');
    const gardenersColRef = collection(db, 'gardeners');

    let clients = [];
    let gardeners = [];
    getDocs(clientsColRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          clients.push(doc.data());
        });
        clients.forEach((client) => {
          if (client.email === currentUser) {
            setFriends(client.friends);
            setUser(client);
          }
        });
      })
      .catch((err) => {
        console.log(err.message, 'error');
      });

    getDocs(gardenersColRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          gardeners.push(doc.data());
        });
        gardeners.forEach((gardener) => {
          if (gardener.email === currentUser) {
            setFriends(gardener.friends);
            setUser(gardener);
          }
        });
      })
      .catch((err) => {
        console.log(err.message, 'error');
      });
  }, []);

  const onAddUser = () => {};

  return (
    <>
      <View style={styles.addUser}>
        <TextInput
          style={styles.input}
          // onChangeText={setUserToAdd}
        />
        <Button title={'Add Friend'} onPress={onAddUser} />
      </View>
      <FlatList />
    </>
  );
};

export default GardenerMessages;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomColor: '#cacaca',
    borderBottomWidth: 1,
  },
  addUser: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    backgroundColor: '#cacaca',
    flex: 1,
    marginRight: 10,
    padding: 10,
  },
});
