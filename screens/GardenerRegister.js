import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase2';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import getLatLong from '../functions/getLatLong';

const GardenerRegister = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    phoneNo: '',
    name: '',
    postCode: '',
    companyName: '',
    isGardener: true,
    friends: [],
  });
  const [selectedJobs, setSelectedJobs] = useState([]);
  const navigation = useNavigation();

  const jobTypesList = [
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

  const handleChange = (text, event) => {
    if (event === 'email') {
      let userEmail = text.toLowerCase();
      setValues((prev) => {
        return { ...prev, [event]: userEmail };
      });
    } else {
      setValues((prev) => {
        return { ...prev, [event]: text };
      });
    }
  };

  useEffect(() => {}, []);

  const handleSignUp = () => {
    const {
      email,
      password,
      phoneNo,
      name,
      isGardener,
      postCode,
      companyName,
      friends,
    } = values;
    if (
      email &&
      password &&
      phoneNo &&
      name &&
      postCode &&
      companyName &&
      selectedJobs
    ) {
      let latLong;
      getLatLong(postCode)
        .then((result) => {
          latLong = result;
        })
        .then(() => {
          const auth = getAuth();
          //Create Auth user w email and password
          if (latLong !== undefined) {
            createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // ...
                //Create DB user with more details
                {
                  try {
                    addDoc(collection(db, 'gardeners'), {
                      email,
                      password,
                      phoneNo,
                      isGardener,
                      name,
                      postCode,
                      companyName,
                      friends,
                      selectedJobs,
                      latLong,
                    });
                    navigation.navigate('Gardener Home');
                  } catch (e) {
                    console.error('Error adding document: ', e);
                  }
                }
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === 'auth/weak-password') {
                  Alert.alert(
                    'Error',
                    'Password should be at least 6 characters'
                  );
                }
                if (errorCode === 'auth/invalid-email') {
                  Alert.alert('Error', 'Please enter a valid email');
                }
                if (errorCode === 'auth/email-already-in-use') {
                  Alert.alert(
                    'Error',
                    'Sorry, a user with that email already exists'
                  );
                }
              });
          } else {
            Alert.alert('Error', 'Please enter a valid postcode');
          }
        });
    } else {
      Alert.alert('Error', 'Please complete all fields');
    }
  };

  const onMultiChange = () => {
    return (value) => {
      setSelectedJobs(xorBy(selectedJobs, [value], 'id'));
      // handleChange(selectedJobs, 'jobTypes');
    };
  };

  // const setJobsToValues = () => {
  //   setValues((prev) => {
  //     console.log(values.jobTypes, 'JOBS');
  //     return { prev, jobTypes: selectedJobs };
  //   });
  // };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => handleChange(text, 'email')}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => handleChange(text, 'password')}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="name"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'name');
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="company"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'companyName');
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="post code"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'postCode');
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="phone number"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'phoneNo');
          }}
          style={styles.input}
        />

        <SelectBox
          label="Job types"
          options={jobTypesList}
          selectedValues={selectedJobs}
          onMultiSelect={onMultiChange()}
          onTapClose={onMultiChange()}
          isMulti
          labelStyle={{
            marginTop: 20,
            backgroundColor: 'white',
            borderRadius: 3,
            padding: 5,
          }}
          containerStyle={{
            backgroundColor: 'white',
            borderRadius: 3,
            padding: 5,
            color: 'green',
          }}
          selectedItemStyle={{ backgroundColor: 'green' }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GardenerRegister;

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
    marginTop: 10,
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
