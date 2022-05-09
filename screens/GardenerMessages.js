import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { auth, db } from '../firebase2';
import { ref } from 'firebase/database';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { TouchableOpacity } from 'react-native';

const GardenerMessages = () => {
  const currentUser = auth.currentUser.email;
  const [currentUserData, setCurrentUserData] = useState({});
  const [friends, setFriends] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // set friends from database with listener that will update them each time a new one is added
  // find current user id
  // find current user's friends
  // map friends so each will be a pressable that navigates to 'Chat' while passing it currentUserData and clientEmail

  const navigation = useNavigation();

  useLayoutEffect(() => {
    try {
      const q = query(
        collection(db, 'gardeners'),
        where('email', '==', currentUser)
      );
      getDocs(q).then((snapshot) => {
        setCurrentUserData(
          snapshot.docs.map((doc) => ({
            name: doc.data().name,
            email: doc.data().email,
            friends: doc.data().friends ? doc.data().friends : [],
            id: doc._key.path.segments[6],
          }))
        );
        setFriends(snapshot.docs[0].data().friends);
        if (snapshot.docs[0].data().friends.length) {
          snapshot.docs[0].data().friends.map((friend) => {
            const q2 = query(
              collection(db, 'clients'),
              where('email', '==', friend)
            );
            getDocs(q2).then((snapshot) => {
              console.log(snapshot.docs[0].data());
              setLoading(false);
              setFriendsData((currFriends) => [
                snapshot.docs[0].data(),
                ...currFriends,
              ]);
            });
          });
        } else setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChat = (email) => {
    navigation.navigate('Chat', {
      currentUserData: currentUserData[0],
      isGardener: true,
      clientEmail: email,
    });
  };

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={Colors.green200} />
      </View>
    );
  else {
    return friendsData.length ? (
      <View style={styles.container}>
        <FlatList
          key={({ item }) => {
            item.id;
          }}
          data={friendsData.map((friend) => {
            return {
              name: friend.name,
              id: friend.email,
            };
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleChat(item.id)}
              style={styles.item}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    ) : (
      <View>
        <Text>No friends :(</Text>
      </View>
    );
  }
};

export default GardenerMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
