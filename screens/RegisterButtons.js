import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const RegisterButtons = () => {
  const navigation = useNavigation();

  const handleClientReg = () => {
    navigation.navigate('Client Register');
  };
  const handleGardenerReg = () => {
    navigation.navigate('Gardener Register');
  };
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/TopLBottomR.png')}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleClientReg} style={styles.button}>
            <Text style={styles.buttonText}>I'm looking for a Gardenr</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGardenerReg}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>I am a Gardenr</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterButtons;

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
  },
  button: {
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
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
