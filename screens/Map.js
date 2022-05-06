// import * as React from 'react';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const MyMap = () => {
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
        <MapView.Marker
          coordinate={{ latitude: 53.4808, longitude: -2.2426 }}
          pinColor="green"
          title="Job 1"
          desciption=""
        />
        <MapView.Marker
          coordinate={{ latitude: 53.501, longitude: -2.2421 }}
          pinColor="green"
          title="Job 2"
          desciption=""
        />
        <MapView.Marker
          coordinate={{ latitude: 53.5011, longitude: -2.2321 }}
          pinColor="green"
          title="Job 3"
          desciption=""
        />
        <MapView.Marker
          coordinate={{ latitude: 53.5051, longitude: -2.2321 }}
          pinColor="green"
          title="Job 4"
          desciption=""
        />
        <MapView.Marker
          coordinate={{ latitude: 53.4512, longitude: -2.2321 }}
          pinColor="green"
          title="Job 5"
          desciption=""
        />
        <MapView.Marker
          coordinate={{ latitude: 53.4423, longitude: -2.2341 }}
          pinColor="green"
          title="Job 6"
          desciption=""
        />
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
