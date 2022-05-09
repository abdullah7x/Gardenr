import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase2';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const LoginScreen = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(user, 'IS A USER');
        // console.log(user.auth.currentUser.email);
        if (user) {
          console.log(user.auth.currentUser.email);
          console.log('INSIDE HERE');
          const q = query(
            collection(db, 'gardeners'),
            where('email', '==', user.auth.currentUser.email)
          );
          getDocs(q).then((snapshot) => {
            console.log(snapshot.docs[0], 'SNAP1');
            if (snapshot.docs.length === 1) {
              navigation.navigate('Gardener Home');
            } else {
              const q2 = query(
                collection(db, 'clients'),
                where('email', '==', user.auth.currentUser.email)
              );
              getDocs(q2).then((snap) => {
                console.log(snapshot.docs[0], 'SNAP2');
                if (snap.docs.length === 1) {
                  navigation.navigate('Client Home', {
                    paramKey: values.email,
                  });
                }
              });
            }
          });

          // navigation.navigate("Home");
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e, 'error logging in');
    }
  }, []);

  const handleReg = () => {
    navigation.navigate('RegisterButtons');
  };

  const handleChange = (text, event) => {
    setValues((prev) => {
      return { ...prev, [event]: text };
    });
  };

  const handleLogin = () => {
    const { email, password } = values;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user;
        console.log(user, 'IN HANDLE LOGIN');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          placeholderTextColor="grey"
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReg}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Not yet registered?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  logo: {
    width: 300,
    height: 300,
  },
});
