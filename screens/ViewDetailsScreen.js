import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { auth, db } from "../firebase2";
import {
  getDocs,
  getDoc,
  doc,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
const ViewDetailsScreen = () => {

  const [currDetails, setCurrDetails] = useState({});
 
  const navigation = useNavigation();
  const navEditDetails = () => {
    navigation.navigate("EditDetails", {
      currDetails,
      setCurrDetails,
    });
  };

  const colRef = collection(db, "gardeners");
  const q = query(colRef, where("email", "==", auth.currentUser.email));
  useEffect(() => {
    getDocs(q).then((snapshot) => {
      setCurrDetails({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
    });
  }, []);

  //console.log(currDetails,"current details")
  // const docRef = doc(db, "clients", currDocID)
  // getDoc(docRef)
  // .then((userDoc) => {
  //   console.log(userDoc.data(), userDoc.id);
  // }
  // )
  //console.log(auth.currentUser);
  return (
    <View style={styles.container}>
      <Text>Company Name: {currDetails?.companyName}</Text>
      <Text>Name: {currDetails?.name}</Text>
      <Text>Location: {currDetails?.postCode}</Text>
      <Text>Availability: {currDetails?.availability}</Text>
      <Text>Email: {currDetails?.email}</Text>
      <Text>Phone number: {currDetails?.phoneNo}</Text>
      <TouchableOpacity onPress={navEditDetails} style={styles.button}>
        <Text style={styles.buttonText}>Edit details</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ViewDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "green",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  Text: {
    color: "black",
    fontWeight: "700",
    fontSize: 17,
  },
});
