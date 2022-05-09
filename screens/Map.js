const axios = require('axios');
import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { auth, db } from '../firebase2';
import { getDocs, query, where, collection } from 'firebase/firestore';

const MyMap = () => {
  const [gardCoords, setGardCoords] = useState({});

  const colRef = collection(db, 'gardeners');
  const q = query(colRef, where('email', '==', auth.currentUser.email));

  useEffect(() => {
    getDocs(q).then((snapshot) => {
      postCodeToCoords(snapshot.docs[0].data().postCode);
    });
  }, []);

  const postCodeToCoords = (postcode) => {
    axios
      .get(`https://api.postcodes.io/postcodes/${postcode}`)
      .then((geoData) => {
        setGardCoords({
          latitude: geoData.data.result.latitude,
          longitude: geoData.data.result.longitude,
        });
      })
      .catch((err) => console.log(err.msg));
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  console.log(gardCoords, 'COORDS test');

  function latLonDistanceMiles(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    const milesDistance = d * 0.621371;
    return milesDistance.toFixed(2);
  }

  // const test = latLonDistanceMiles(53.4808, -2.2426, 53.501, -2.2421 )
  // console.log(test)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 53.4808,
          longitude: -2.2426,
          latitudeDelta: 0.5922,
          longitudeDelta: 0.4421,
        }}
      >
        <Marker
          coordinate={{
            latitude: Object.keys(gardCoords).length
              ? gardCoords.latitude
              : 53.4808,
            longitude: Object.keys(gardCoords).length
              ? gardCoords.longitude
              : -2.2426,
          }}
          pinColor="red"
          title="You are based here"
          description=""
        ></Marker>

        <Marker
          coordinate={{ latitude: 53.501, longitude: -2.2421 }}
          pinColor="green"
          title="Job 2"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.501,
                -2.2421
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.5011, longitude: -2.2321 }}
          pinColor="green"
          title="Job 3"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.5011,
                -2.2321
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.5051, longitude: -2.2321 }}
          pinColor="green"
          title="Job 4"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.5051,
                -2.2321
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4512, longitude: -2.2321 }}
          pinColor="green"
          title="Job 5"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4512,
                -2.2321
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4423, longitude: -2.2341 }}
          pinColor="green"
          title="Job 6"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4423,
                -2.2341
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4623, longitude: -2.2141 }}
          pinColor="green"
          title="Job 7"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4623,
                -2.2141
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4633, longitude: -2.2911 }}
          pinColor="green"
          title="Job 8"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4633,
                -2.2911
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4923, longitude: -2.2641 }}
          pinColor="green"
          title="Job 9"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4923,
                -2.2641
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4913, longitude: -2.2541 }}
          pinColor="green"
          title="Job 10"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4913,
                -2.2541
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4823, longitude: -2.2541 }}
          pinColor="green"
          title="Job 11"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4823,
                -2.2541
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4713, longitude: -2.2441 }}
          pinColor="green"
          title="Job 12"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4713,
                -2.2441
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4733, longitude: -2.2911 }}
          pinColor="green"
          title="Job 13"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4733,
                -2.2911
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4933, longitude: -2.2111 }}
          pinColor="green"
          title="Job 14"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4933,
                -2.2111
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4833, longitude: -2.2011 }}
          pinColor="green"
          title="Job 15"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4833,
                -2.2011
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: 53.4733, longitude: -2.2211 }}
          pinColor="green"
          title="Job 16"
          description=""
        >
          <Callout>
            <Text>
              is{' '}
              {latLonDistanceMiles(
                gardCoords?.latitude,
                gardCoords?.longitude,
                53.4733,
                -2.2211
              )}{' '}
              miles away
            </Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MyMap;
