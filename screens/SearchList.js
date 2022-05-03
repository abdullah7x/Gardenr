import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase2";

import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const SearchList = ({ route }) => {
  const [docList, setDocList] = useState([]);
  const { paramKey } = route.params;

  const searchRef = collection(db, "gardeners");
  const q = query(searchRef);

  useEffect(() => {
    try {
      const q = query(collection(db, "gardeners"));
      getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const currDoc = doc.data();

          if (currDoc.location === paramKey) {
            setDocList((currDocs) => {
              return [...currDocs, currDoc];
            });
          }
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);

  return (
    <View style={styles.inputContainer}>
      {docList.map((doc) => {
        return (
          <View>
            <Text>{doc.email}</Text>
            <Text>{doc.username}</Text>
            <Text>{doc.location}</Text>
          </View>
        );
      })}
    </View>
  );
};
export default SearchList;
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
