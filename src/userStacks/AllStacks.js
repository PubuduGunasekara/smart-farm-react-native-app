import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import CleaningController from "../components/controllers/CleaningController";
import FoodController from "../components/controllers/FoodController";
import GateController from "../components/controllers/GateController";
import WaterController from "../components/controllers/WaterController";
import ApproveUser from "../components/AdminPages/ApproveUser";
import ManageUser from "../components/AdminPages/ManageUser";
import ShiftAllocation from "../components/AdminPages/ShiftAllocation";
import Home from "../components/controllers/Home";
import viewSingleUserRequest from "../components/AdminPages/viewSingleUserRequest";
import ShiftChangeRequests from "../../src/components/AdminPages/ShiftRequestAndModify/ShiftChangeRequests";
import ModifyShiftFromRequests from "../../src/components/AdminPages/ShiftRequestAndModify/ModifyShiftFromRequests";
import ViewAllShifts from "../../src/components/AdminPages/ViewAllShifts";
import Notifications from "../../src/components/UserPages/Notifications";

import About from "../components/About";
import AllActivities from "../components/AdminPages/AllActivities";
import ReviewIncident from "../components/AdminPages/ReviewIncident";
import Communication from "../components/AdminPages/Communication";

import CommunicationUser from "../components/UserPages/CommunicationUser";
import MyActivities from "../components/UserPages/MyActivities";
import MyShift from "../components/UserPages/MyShift";
import ReportIncident from "../components/UserPages/ReportIncident";
import ViewIncident from "../components/UserPages/ViewIncident";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../redux/actions/userLogin";

const Stack = createStackNavigator();

const AllStacks = ({ navigation, logout }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "",
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

                <TouchableOpacity
                  onPress={() => {
                    logout();
                  }}
                >
                  <Text>Sign out</Text>
                </TouchableOpacity>
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
        name="FoodController"
        component={FoodController}
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
        name="CleaningController"
        component={CleaningController}
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
        name="GateController"
        component={GateController}
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
        name="WaterController"
        component={WaterController}
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
        name="ApproveUser"
        options={{
          headerTitle: `Approve User`,
          headerRight: () => {},
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <AntDesign name="Search" size={100} color="red" />
              </TouchableOpacity>
            );
          },
        }}
        component={ApproveUser}
      />

      <Stack.Screen
        name="ShiftChangeRequests"
        component={ShiftChangeRequests}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {},
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
        name="ModifyShiftFromRequests"
        component={ModifyShiftFromRequests}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {},
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
        name="ManageUser"
        options={{
          headerTitle: `Manage User`,
          headerRight: () => {},
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <AntDesign name="Search" size={100} color="red" />
              </TouchableOpacity>
            );
          },
        }}
        component={ManageUser}
      />

      <Stack.Screen
        name="ShiftAllocation"
        component={ShiftAllocation}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {},
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
        name="ViewAllShifts"
        component={ViewAllShifts}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitle: "",

          headerRight: () => {},
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
        name="viewSingleUserRequest"
        options={{
          headerTitle: `Approve user`,
          headerRight: () => {},
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              >
                <AntDesign name="Search" size={100} color="red" />
              </TouchableOpacity>
            );
          },
        }}
        component={viewSingleUserRequest}
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

      {/* <Stack.Screen
        name="AllActivities"
        options={{
          headerTitle: `All Activities`,
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
        }}
        component={AllActivities}
      />

      <Stack.Screen
        name="ReviewIncident"
        options={{
          headerTitle: `Review Incident`,
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
        }}
        component={ReviewIncident}
      />
      <Stack.Screen
        name="Communication"
        options={{
          headerTitle: `Communication`,
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
        }}
        component={Communication}
      />
      <Stack.Screen
        name="About"
        options={{
          headerTitle: `About`,
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
        }}
        component={About}
      />
      <Stack.Screen
        name="CommunicationUser"
        options={{
          headerTitle: `Communication User`,
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
        }}
        component={CommunicationUser}
      />
      <Stack.Screen
        name="MyShift"
        options={{
          headerTitle: `My Shift`,
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
        }}
        component={MyShift}
      />
      <Stack.Screen
        name="MyActivities"
        options={{
          headerTitle: `My Activities`,
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
        }}
        component={MyActivities}
      />
      <Stack.Screen
        name="ViewIncident"
        options={{
          headerTitle: `View Incident`,
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
        }}
        component={ViewIncident}
      />
      <Stack.Screen
        name="ReportIncident"
        options={{
          headerTitle: `Report Incident`,
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
        }}
        component={ReportIncident}
      /> */}
    </Stack.Navigator>
  );
};

const mapDispatchProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchProps)(AllStacks);
