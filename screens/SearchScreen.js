import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { auth, db } from '../firebase2';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import getLatLong from '../functions/getLatLong';

const SearchScreen = (props) => {
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const jobTypes = [
    { item: 'Basic maintanence', id: 'BASIC' },
    { item: 'Green waste disposal', id: 'TRIM' },
    { item: 'Landscaping', id: 'SCAPE' },
    { item: 'Pest control', id: 'PEST' },
    { item: 'Installation services', id: 'INSTALL' },
    { item: 'Planting', id: 'PLANT' },
    { item: 'Horticulture', id: 'HORT' },
    { item: 'Tree surgery', id: 'TREE' },
    { item: 'Irrigation', id: 'IRRI' },
  ];

  const navigation = useNavigation();

  const handleChange = (searchValue) => {
    setLocationSearch(searchValue);
  };

  const handleSearch = async () => {
    const result = await getLatLong(locationSearch);
    if (result !== undefined) {
      navigation.navigate('SearchList', { locationSearch, selectedJobs });
    } else {
      Alert.alert('Error', 'Please enter a valid post code');
    }

  const onMultiChange = () => {
    return (value) => setSelectedJobs(xorBy(selectedJobs, [value], 'id'));
  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/TopLBottomR.png')}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your postcode"
            placeholderTextColor="grey"
            onChangeText={(text) => handleChange(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <SelectBox
            label="Select job types"
            options={jobTypes}
            selectedValues={selectedJobs}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
            inputPlaceholder="Required"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSearch} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  multiselect: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
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
