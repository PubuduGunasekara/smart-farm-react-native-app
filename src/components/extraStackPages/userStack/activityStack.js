import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import MyActivities from "../../UserPages/MyActivities";
import Notifications from "../../UserPages/Notifications";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../../redux/actions/userLogin";

const Stack = createStackNavigator();

const MyActivityStack = ({ navigation, logout }) => {
  return (
    <Stack.Navigator initialRouteName="MyActivities">
      <Stack.Screen
        name="MyActivities"
        component={MyActivities}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: `My Activities`,
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Notifications")}
                  >
                    <MaterialIcons
                      name="notifications-none"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      logout();
                    }}
                  >
                    <Text>Sign out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                >
                  <AntDesign name="menu-fold" size={30} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
        })}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: `Notifications`,
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row" }}>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Notifications")}
                  >
                    <MaterialIcons
                      name="notifications-on"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      logout();
                    }}
                  >
                    <Text>Sign out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                >
                  <AntDesign name="menu-fold" size={30} color="black" />
                </TouchableOpacity>
              </View>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

const mapDispatchProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchProps)(MyActivityStack);
