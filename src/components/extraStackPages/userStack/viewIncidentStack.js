import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import ViewIncident from "../../UserPages/ViewIncident";
import Notifications from "../../UserPages/Notifications";
import ViewProfile from "../../ViewProfile";
import EmployeeEdit from "../../EditProfile";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../../redux/actions/userLogin";

const Stack = createStackNavigator();

const ViewIncidentUserStack = ({ navigation, logout }) => {
  return (
    <Stack.Navigator initialRouteName="ViewIncident">
      <Stack.Screen
        name="ViewIncident"
        component={ViewIncident}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
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
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ViewProfile")}
                  >
                    <FontAwesome name="user-circle-o" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View style={{ marginLeft: 10 }}>
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
          headerTitle: "",

          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
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
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ViewProfile")}
                  >
                    <FontAwesome name="user-circle-o" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View style={{ marginLeft: 10 }}>
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
        name="ViewProfile"
        component={ViewProfile}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
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
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EmployeeEdit")}
                  >
                    <MaterialCommunityIcons
                      name="account-edit"
                      size={28}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View style={{ marginLeft: 10 }}>
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
        name="EmployeeEdit"
        component={EmployeeEdit}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", marginRight: 10 }}>
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
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ViewProfile")}
                  >
                    <FontAwesome name="user-circle-o" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
          headerLeft: () => {
            return (
              <View style={{ marginLeft: 10 }}>
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

export default connect(null, mapDispatchProps)(ViewIncidentUserStack);
