import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase2";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { collection, addDoc, setDoc } from "firebase/firestore";

const GardenerRegister = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    phoneNo: "",
    name: "",
    postCode: "",
    availability: "",
    companyName: "",
    isGardener: true,
    friends: [],
  });

  const handleChange = (text, event) => {
    setValues((prev) => {
      return { ...prev, [event]: text };
    });
  };

  const handleSignUp = () => {
    const {
      email,
      password,
      phoneNo,
      name,
      isGardener,
      postCode,
      availability,
      companyName,
      friends,
    } = values;
    const auth = getAuth();
    //Create Auth user w email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
        //Create DB user with more details
        {
          try {
            addDoc(collection(db, "gardeners"), {
              email,
              password,
              phoneNo,
              isGardener,
              name,
              postCode,
              availability,
              companyName,
              friends,
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View>
      <Text>Register as a new Gardenr</Text>

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="email"
            onChangeText={(text) => handleChange(text, "email")}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            onChangeText={(text) => handleChange(text, "password")}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="name"
            onChangeText={(text) => {
              handleChange(text, "name");
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="company"
            onChangeText={(text) => {
              handleChange(text, "companyName");
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="availability"
            onChangeText={(text) => {
              handleChange(text, "availability");
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="post code"
            onChangeText={(text) => {
              handleChange(text, "postCode");
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="phone number"
            onChangeText={(text) => {
              handleChange(text, "phoneNo");
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
    </View>
  );
};

export default GardenerRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "green",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "green",
    fontWeight: "700",
    fontSize: 16,
  },
});
