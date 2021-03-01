import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import CleaningController from "../components/controllers/CleaningController";
import FoodController from "../components/controllers/FoodController";
import GateController from "../components/controllers/GateController";
import WaterController from "../components/controllers/WaterController";
import ApproveUser from "../components/AdminPages/ApproveUser";
import ManageUser from "../components/AdminPages/ManageUser";
import ShiftAllocation from "../components/AdminPages/ShiftAllocation";
import Home from "../components/controllers/Home";
import viewSingleUserRequest from "../components/AdminPages/viewSingleUserRequest";

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
          headerTitle: `Home`,
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
        options={() => ({
          headerTitle: `Food Controller`,
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
        name="FoodController"
        component={FoodController}
      />

      <Stack.Screen
        options={() => ({
          headerTitle: `Cleaning Controller`,
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
        name="CleaningController"
        component={CleaningController}
      />

      <Stack.Screen
        name="GateController"
        options={{
          headerTitle: `Gate Controller`,
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
        component={GateController}
      />

      <Stack.Screen
        name="WaterController"
        options={{
          headerTitle: `Water Controller`,
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
        component={WaterController}
      />

      <Stack.Screen
        name="ApproveUser"
        options={{
          headerTitle: `Approve User`,
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
        component={ApproveUser}
      />

      <Stack.Screen
        name="ManageUser"
        options={{
          headerTitle: `Manage User`,
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
        component={ManageUser}
      />

      <Stack.Screen
        name="ShiftAllocation"
        options={{
          headerTitle: `Shift Allocation`,
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
        component={ShiftAllocation}
      />

      <Stack.Screen
        name="viewSingleUserRequest"
        options={{
          headerTitle: `Approve user`,
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
        component={viewSingleUserRequest}
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
