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

const GardenerHome = () => {
  return (
    <View>
      <Text>GARDENER HOME</Text>
    </View>
  );
};

export default GardenerHome;
