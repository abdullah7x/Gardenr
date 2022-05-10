import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { db } from '../firebase2';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const EditClient = () => {
  const auth = getAuth();
  const [currDetails, setCurrDetails] = useState({});
  const navigation = useNavigation();

  const docId = currDetails.id;
  const [values, setValues] = useState({
    email: '',
    phoneNo: '',
    name: '',
  });

  const colRef = collection(db, 'clients');
  const q = query(colRef, where('email', '==', auth.currentUser.email));

  useEffect(() => {
    getDocs(q).then((snapshot) => {
      setCurrDetails({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      setValues({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
    });
  }, []);

  const handleChange = (text, event) => {
    setValues((prev) => {
      return { ...prev, [event]: text };
    });
  };

  console.log(currDetails, 'normal');

  const restoreDetails = () => {
    console.log(currDetails, 'inside restore');
    setValues({ ...currDetails });
  };

  const handleUpdate = () => {
    const { email, phoneNo, name } = values;
    try {
      setDoc(
        doc(db, 'clients', docId),
        {
          email,
          phoneNo,
          name,
        },
        { merge: true }
      ).then(() => {
        setCurrDetails({ ...values });
        navigation.navigate('Client Home');
      });
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          value={values?.name ? values?.name : ''}
          placeholder="Name"
          autoCapitalize="none"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'name');
          }}
          style={styles.input}
        />
        <TextInput
          value={values?.email ? values?.email : ''}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'email');
          }}
          style={styles.input}
        />
        <TextInput
          value={values?.phoneNo ? values?.phoneNo : ''}
          placeholder="Phone Number"
          placeholderTextColor="grey"
          selectionColor="green"
          onChangeText={(text) => {
            handleChange(text, 'phoneNo');
          }}
          style={styles.input}
        />
      </View>
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
    </KeyboardAvoidingView>
  );
};

export default EditClient;

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
