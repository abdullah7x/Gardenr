import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import SearchList from './screens/SearchList';
import RegisterButtons from './screens/RegisterButtons';
import GardenerRegister from './screens/GardenerRegister';
import UserRegister from './screens/UserRegister';
import SingleGardener from './screens/SingleGardener';
import Chat from './screens/Chat';
import GardenerMessages from './screens/GardenerMessages';
import ViewDetailsScreen from './screens/ViewDetailsScreen';
import EditDetailsScreen from './screens/EditDetailsScreen';
import MyMap from './screens/Map';
import ClientMessages from './screens/ClientMessages';
import { LogBox } from 'react-native';
import EditClient from './screens/EditClient';

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen name="Register" component={RegisterButtons} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Search Results" component={SearchList} />
        <Stack.Screen
          name="Gardener Register"
          component={GardenerRegister}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="Client Register"
          component={UserRegister}
          options={{ title: 'Register' }}
        />
        <Stack.Screen name="Messages" component={ClientMessages} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Gardener Home"
          component={ViewDetailsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Client Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Conversations"
          component={GardenerMessages}
          options={{ title: 'Messages' }}
        />
        <Stack.Screen name="Edit Details" component={EditDetailsScreen} />
        <Stack.Screen
          options={{ title: 'Profile' }}
          name="SingleGardener"
          component={SingleGardener}
        />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Map" component={MyMap} />
        <Stack.Screen
          name="Edit Profile"
          component={EditClient}
          options={{ title: 'Edit Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
