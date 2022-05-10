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
import getLatLong from '../functions/getLatLong';
import getDistance from '../functions/getDistance';

const lodash = require('lodash');

const SearchList = ({ route }) => {
  const [primaryLocation, setPrimaryLocation] = useState({});
  const [docList, setDocList] = useState([]);
  const [latLong, setLatLong] = useState({});
  const { locationSearch, selectedJobs } = route.params;
  const searchJobs = selectedJobs;

  const searchRef = collection(db, 'gardeners');
  const q = query(searchRef);
  const navigation = useNavigation();
  const handleClick = (gardener) => {
    navigation.navigate('SingleGardener', { gardener });
  };

  const searchJobIds = searchJobs.map((job) => {
    return job.id;
  });
  const clientJobs = searchJobIds.length;

  useEffect(() => {
    getLatLong(locationSearch).then((res) => {
      setPrimaryLocation(res);
    });
  }, [locationSearch]);

  useEffect(() => {
    try {
      const q = query(collection(db, 'gardeners'));
      getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const currDoc = doc.data();
          const selectJobIds = currDoc.selectedJobs?.map((job) => {
            return job.id;
          });

          const match = searchJobIds.filter((x) => selectJobIds?.includes(x));
          const searchMatches = match.length;
          currDoc.searchMatches = searchMatches;
          if (searchMatches) {
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

  const sortedArr = lodash.sortBy(docList, (e) => {
    return e.searchMatches;
  });
  const reverseArr = sortedArr.reverse();

  const LeftContent = (props) => <Avatar.Icon {...props} icon="flower" />;
  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        {reverseArr.map((doc, index) => {
          const gardenerLocation = doc.latLong;
          console.log(gardenerLocation.lat, 'PL');
          const distanceToUser = getDistance(
            primaryLocation.lat,
            primaryLocation.lng,
            gardenerLocation.lat,
            gardenerLocation.lng
          );

          return (
            <Card key={doc.email}>
              <Card.Title
                title={doc.companyName}
                subtitle={`${distanceToUser} miles away`}
                left={LeftContent}
              />
              <Card.Content>
                <Title>{`Matches ${doc.searchMatches} / ${clientJobs} of your job needs`}</Title>
                <Paragraph></Paragraph>
              </Card.Content>
              <Card.Cover
                source={{
                  uri: 'https://thumbs.dreamstime.com/b/sunken-garden-10630510.jpg',
                }}
              />
              <Card.Actions>
                <TouchableOpacity
                  onPress={() => handleClick(reverseArr[index])}
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
