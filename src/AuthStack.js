import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "../src/Center";
import { AuthContext } from "./AuthProvider";

import Register from "../src/components/authPages/Register";
import Login from "./components/authPages/Login";

const Stack = createStackNavigator();

export const AuthStack = ({ children }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen
        screenOptions={{ headerShown: false }}
        name="Login"
        component={Login}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",
        })}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",
        })}
      />
    </Stack.Navigator>
  );
};
