import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import MyShift from "../MyShift/MyShift";
import RequestShiftChange from "../MyShift/RequestShiftChange";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../../redux/actions/userLogin";

const Stack = createStackNavigator();

const MyShiftHome = ({ logout, navigation }) => {
  return (
    <Stack.Navigator initialRouteName="MyShift">
      <Stack.Screen
        name="MyShift"
        component={MyShift}
        options={() => ({
          headerTitle: `MyShift`,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>Sign out</Text>
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <AntDesign name="Search" size={100} color="red" />
              </TouchableOpacity>
            );
          },
        })}
      />
      <Stack.Screen
        name="RequestShiftChange"
        component={RequestShiftChange}
        options={() => ({
          headerTitle: `Request Shift Change`,
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>Sign out</Text>
              </TouchableOpacity>
            );
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <AntDesign name="Search" size={100} color="red" />
              </TouchableOpacity>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

const mapDispatchProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchProps)(MyShiftHome);
