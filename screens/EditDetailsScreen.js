import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { auth, db } from '../firebase2';
import {
  getDocs,
  getDoc,
  doc,
  setDoc,
  query,
  where,
  collection,
  onSnapshot,
} from 'firebase/firestore';

const EditDetailsScreen = ({ route }) => {
  const { currDetails, setCurrDetails } = route.params;

  const navigation = useNavigation();

  console.log(currDetails, 'original details');

  const [docId, setDocId] = useState('');
  const [values, setValues] = useState({
    email: '',
    phoneNo: '',
    name: '',
    postCode: '',
    companyName: '',
  });

  console.log(values, 'vals');

  useEffect(() => {
    setValues({ ...currDetails });
  }, []);

  const handleChange = (text, event) => {
    setValues((prev) => {
      return { ...prev, [event]: text };
    });
  };

  const restoreDetails = () => {
    console.log('restore');
    setCurrDetails({ ...currDetails });
  };

  useEffect(() => {
    const q2 = query(
      collection(db, 'gardeners'),
      where('email', '==', currDetails.email)
    );
    getDocs(q2).then((snap) => {
      setDocId(snap.docs[0]._key.path.segments[6]);
    });
  }, []);

  const handleUpdate = () => {
    const { email, phoneNo, name, postCode, companyName } = values;
    try {
      setDoc(
        doc(db, 'gardeners', docId),
        {
          email,
          phoneNo,
          name,
          postCode,

          companyName,
        },
        { merge: true }
      ).then(() => {
        setCurrDetails({ ...values });
        navigation.navigate('Gardener Home');
      });
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  return (
    <View>
      <TextInput
        defaultValue={currDetails?.companyName}
        placeholder="Company Name"
        onChangeText={(text) => {
          handleChange(text, 'companyName');
        }}
        style={styles.input}
      />
      <TextInput
        defaultValue={currDetails?.name}
        placeholder="Name"
        onChangeText={(text) => {
          handleChange(text, 'name');
        }}
        style={styles.input}
      />
      <TextInput
        defaultValue={currDetails?.postCode}
        placeholder="Post code"
        onChangeText={(text) => {
          handleChange(text, 'postCode');
        }}
        style={styles.input}
      />
      <TextInput
        defaultValue={currDetails?.email}
        placeholder="Email"
        onChangeText={(text) => {
          handleChange(text, 'email');
        }}
        style={styles.input}
      />
      <TextInput
        defaultValue={currDetails?.phoneNo}
        placeholder="Phone Number"
        onChangeText={(text) => {
          handleChange(text, 'phoneNo');
        }}
        style={styles.input}
      />
      {/* change availability field to dropdown box */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={restoreDetails} style={styles.button}>
          <Text style={styles.buttonText}>Restore Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdate}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Save Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditDetailsScreen;
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
});
