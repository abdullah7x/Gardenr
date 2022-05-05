import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Picker,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase2';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { ScrollView } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
const SearchList = ({ route }) => {
  const [docList, setDocList] = useState([]);
  const { paramKey } = route.params;
  const searchRef = collection(db, 'gardeners');
  const navigation = useNavigation();
  const q = query(searchRef);
  const handleClick = (gardener) => {
    navigation.navigate('SingleGardener', { gardener });
  };
  useEffect(() => {
    try {
      const q = query(collection(db, 'gardeners'));
      getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const currDoc = doc.data();
          if (currDoc.location === paramKey) {
            setDocList((currDocs) => {
              return [...currDocs, currDoc];
            });
          }
        });
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }, []);
  const LeftContent = (props) => <Avatar.Icon {...props} icon="flower" />;
  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        {docList.map((doc, index) => {
          return (
            <Card>
              <Card.Title
                title={doc.email}
                subtitle="distance from you"
                left={LeftContent}
              />
              <Card.Content>
                <Title>{doc.location}</Title>
                <Paragraph></Paragraph>
              </Card.Content>
              <Card.Cover
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/sunken-garden-10630510.jpg',
                }}
              />
              <Card.Actions>
                <TouchableOpacity
                  onPress={() => handleClick(docList[index])}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>View</Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default SearchList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
});
