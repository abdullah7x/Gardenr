import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { db } from '../firebase2';
import {
  getDocs,
  doc,
  setDoc,
  query,
  where,
  collection,
} from 'firebase/firestore';
import { xorBy } from 'lodash';
import { getAuth } from 'firebase/auth';

const EditDetailsScreen = () => {
  const auth = getAuth();
  const [currDetails, setCurrDetails] = useState({});

  const navigation = useNavigation();

  const jobTypes = [
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

  const docId = currDetails?.id;
  const [values, setValues] = useState({
    email: '',
    phoneNo: '',
    name: '',
    postCode: '',
    companyName: '',
  });
  const [selectedJobs, setSelectedJobs] = useState([]);

  const colRef = collection(db, 'gardeners');
  const q = query(colRef, where('email', '==', auth.currentUser.email));

  const onMultiChange = () => {
    return (value) => {
      setSelectedJobs(xorBy(selectedJobs, [value], 'id'));
      // handleChange(selectedJobs, 'jobTypes');
    };
  };

  useEffect(() => {
    getDocs(q).then((snapshot) => {
      setCurrDetails({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      setValues({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      setSelectedJobs(snapshot.docs[0].data().selectedJobs);
    });
  }, []);

  const handleChange = (text, event) => {
    setValues((prev) => {
      return { ...prev, [event]: text };
    });
  };

  const restoreDetails = () => {
    setValues({ ...currDetails });
    setSelectedJobs(currDetails?.selectedJobs);
  };

  useEffect(() => {}, []);

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
          selectedJobs,
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
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/TopLBottomR.png')}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
          <TextInput
            value={values?.companyName}
            placeholder="Company Name"
            onChangeText={(text) => {
              handleChange(text, 'companyName');
            }}
            style={styles.input}
          />
          <TextInput
            value={values?.name}
            placeholder="Name"
            onChangeText={(text) => {
              handleChange(text, 'name');
            }}
            style={styles.input}
          />
          <TextInput
            value={values?.postCode}
            placeholder="Post code"
            onChangeText={(text) => {
              handleChange(text, 'postCode');
            }}
            style={styles.input}
          />
          <TextInput
            value={values?.email}
            placeholder="Email"
            onChangeText={(text) => {
              handleChange(text, 'email');
            }}
            style={styles.input}
          />
          <TextInput
            value={values?.phoneNo}
            placeholder="Phone Number"
            onChangeText={(text) => {
              handleChange(text, 'phoneNo');
            }}
            style={styles.input}
          />
          {/* change availability field to dropdown box */}
          <SelectBox
            label="Select job types"
            options={jobTypes}
            selectedValues={selectedJobs}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
            inputPlaceholder="Required"
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
    </ImageBackground>
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
