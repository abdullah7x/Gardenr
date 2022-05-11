import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { auth, db, app } from '../firebase2';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

const UserRegister = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    phoneNo: '',
    name: '',
    isGardener: false,
    friends: [],
  });
  const navigation = useNavigation();

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

  const handleSignUp = () => {
    const { email, password, phoneNo, name, isGardener, friends } = values;
    const auth = getAuth();
    if (email && password && phoneNo && name) {
      console.log('creating');
      //Create Auth user w email and password
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, 'NEW USER');

          // ...
          //Create DB user with more details
          {
            try {
              addDoc(collection(db, 'clients'), {
                email,
                password,
                phoneNo,
                isGardener,
                name,
                friends,
              });
              navigation.navigate('Client Home', { paramKey: values.email });
            } catch (e) {
              console.error('Error adding document: ', e);
            }
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/weak-password') {
            Alert.alert('Error', 'Password should be at least 6 characters');
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
          console.log(errorCode, errorMessage);
        });
    } else Alert.alert('Error', 'Please complete all fields');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          placeholderTextColor="grey"
          autoCapitalize="none"
          onChangeText={(text) => handleChange(text, 'email')}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="grey"
          onChangeText={(text) => handleChange(text, 'password')}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            handleChange(text, 'name');
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="phone number"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            handleChange(text, 'phoneNo');
          }}
          style={styles.input}
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

export default UserRegister;

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
