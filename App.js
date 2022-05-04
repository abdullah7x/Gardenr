import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchList from "./screens/SearchList";
import RegisterButtons from "./screens/RegisterButtons";
import GardenerRegister from "./screens/GardenerRegister";
import UserRegister from "./screens/UserRegister";
import GardenerHome from "./screens/GardenerHome";
import ViewDetailsScreen from "./screens/ViewDetailsScreen";
import EditDetailsScreen from "./screens/EditDetailsScreen";

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
        <Stack.Screen name="RegisterButtons" component={RegisterButtons} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchList" component={SearchList} />
        <Stack.Screen name="Gardener Register" component={GardenerRegister} />
        <Stack.Screen name="User Register" component={UserRegister} />
        <Stack.Screen name="Gardener Home" component={ViewDetailsScreen} />
        <Stack.Screen name="Client Home" component={HomeScreen} />
        <Stack.Screen name="EditDetails" component={EditDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
