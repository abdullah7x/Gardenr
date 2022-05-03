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
import { collection, addDoc } from "firebase/firestore";

const LoginScreen = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    phoneNo: "",
    location: "",
    isGardener: "",
    username: "",
  });

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleChange = (text, event) => {
    setValues((prev) => {
      return { ...prev, [event]: text };
    });
  };

  const handleSignUp = () => {
    const { email, password, phoneNo, isGardener, location, username } = values;
    const auth = getAuth();
    //Create Auth user w email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
        //Create DB user with more details
        if (isGardener === "no") {
          try {
            addDoc(collection(db, "clients"), {
              email,
              password,
              phoneNo,
              isGardener,
              location,
              username,
            }).then((docData) => {
              console.log("Document written with ID: ", docData.id);
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          try {
            addDoc(collection(db, "gardeners"), {
              email,
              password,
              phoneNo,
              isGardener,
              location,
              username,
            }).then((docData) => {
              console.log("Document written with ID: ", docData.id);
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

  const handleLogin = () => {
    const { email, password } = values;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
    });
  };

  return (
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
          placeholder="username"
          onChangeText={(text) => {
            handleChange(text, "username");
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
        <TextInput
          placeholder="location"
          onChangeText={(text) => {
            handleChange(text, "location");
          }}
          style={styles.input}
        />

        <TextInput
          placeholder="gardener?"
          onChangeText={(text) => {
            handleChange(text, "isGardener");
          }}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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

export default LoginScreen;

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
