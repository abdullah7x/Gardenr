import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { db } from '../firebase2';

import { collection, getDocs, query } from 'firebase/firestore';
import { ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import getLatLong from '../functions/getLatLong';
import getDistance from '../functions/getDistance';

const lodash = require('lodash');

const SearchList = ({ route }) => {
  const [primaryLocation, setPrimaryLocation] = useState({});
  const [docList, setDocList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locationSearch, selectedJobs } = route.params;
  const searchJobs = selectedJobs;

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
          setLoading(false);
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
  if (loading) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator animating={true} color={Colors.green200} />
      </View>
    );
  } else if (reverseArr.length) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {reverseArr.map((doc, index) => {
            const gardenerLocation = doc.latLong;
            const distanceToUser = getDistance(
              primaryLocation.lat,
              primaryLocation.lng,
              gardenerLocation.lat,
              gardenerLocation.lng
            );

            return (
              <Card
                key={doc.email}
                mode={'outlined'}
                style={styles.inputContainer}
              >
                <ImageBackground
                  style={{ flex: 1 }}
                  source={require('../assets/backgroundMulti.png')}
                >
                  <Card.Title
                    title={doc.companyName}
                    subtitle={`${distanceToUser} miles away`}
                    left={LeftContent}
                  />
                  <Card.Content>
                    <Title
                      style={styles.subtitleText}
                    >{`Matches ${doc.searchMatches} / ${clientJobs} of your job needs`}</Title>
                    <Paragraph></Paragraph>
                  </Card.Content>

                  <Card.Actions>
                    <TouchableOpacity
                      onPress={() => handleClick(reverseArr[index])}
                      style={styles.button}
                    >
                      <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                  </Card.Actions>
                </ImageBackground>
              </Card>
            );
          })}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.noMatchContainer}>
        <Text style={styles.noMatchText}>
          Sorry, we couldn't find any Gardenrs that match your jobs needs at the
          moment.
        </Text>
        <Text style={styles.noMatchText}>
          You can try searching for a different set of job types to find a close
          match.
        </Text>
      </View>
    );
  }
};
export default SearchList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadContainer: {
    flex: 1,
    paddingTop: 22,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  noMatchContainer: {
    flex: 1,

    alignItems: 'center',
  },
  noMatchText: {
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
  subtitleText: {
    color: 'grey',
    fontSize: 16,
  },
});
