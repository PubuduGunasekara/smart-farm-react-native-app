import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar } from "react-native-elements";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerActions } from "@react-navigation/native";

import AllStacks from "./userStacks/AllStacks";
import About from "../src/components/About";
import AllActivities from "../src/components/AdminPages/AllActivities";
import ShiftAllocation from "../src/components/AdminPages/ShiftAllocation";
import ReviewIncident from "../src/components/AdminPages/ReviewIncident";
import Communication from "../src/components/AdminPages/Communication";

import CommunicationUser from "../src/components/UserPages/CommunicationUser";
import MyActivities from "../src/components/UserPages/MyActivities";
import MyShiftHome from "../src/components/UserPages/MyShift";
import ReportIncident from "../src/components/UserPages/ReportIncident";
import ViewIncident from "../src/components/UserPages/ViewIncident";
import Home from "../src/components/controllers/Home";
import AllActivityStack from "../src/components/extraStackPages/adminStack/activityStack";
import MyActivityStack from "../src/components/extraStackPages/userStack/activityStack";
import CommunicationStack from "../src/components/extraStackPages/adminStack/communicationsStack";
import ShiftAllocationStack from "./components/extraStackPages/adminStack/shiftAllocationStack";
import CommunicationsUserStack from "./components/extraStackPages/userStack/communicationUserStacks";
import AboutStack from "../src/components/extraStackPages/AboutStack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-native";

import { logout } from "../src/redux/actions/userLogin";

const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem label="Help" onPress={() => alert("Link to help")} />
//     </DrawerContentScrollView>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <View style={{ flex: 1 }}>
//       <DrawerContentScrollView>
//         <View>
//           <View></View>
//         </View>
//       </DrawerContentScrollView>
//       <View style={{ margin: 15, borderTopWidth: 1 }}>
//         <DrawerItem
//           label="Sign out"
//           onPress={() => {
//             alert("log out pressed");
//           }}
//           icon={({ color, size }) => {
//             <Icons name="exit-to-app" color="black" size={50} />;
//           }}
//         />
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    color: "#a8a8a8",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    margin: 15,
    paddingTop: 15,
  },
  bottomDrawerSection: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    margin: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

const AppDrawer = ({ currentUser, logout }) => {
  const CustomDrawerContent = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 15,
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  rounded
                  size={100}
                  source={{
                    uri: "../assets/avatar.png",
                  }}
                />

                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text style={styles.title}>
                    {currentUser.firstName} {currentUser.lastName}
                  </Text>
                  <Text style={styles.caption}>
                    Level - {currentUser.accessLevel}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.drawerSection}>
              <DrawerItemList {...props} />
            </View>
          </View>
        </DrawerContentScrollView>
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            style={{ margin: 0, padding: 0 }}
            icon={() => (
              <Icon
                name="logout"
                color="black"
                size={30}
                style={{ margin: 0, padding: 0 }}
              />
            )}
            label="Sign Out"
            onPress={() => {
              logout(), props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
        </View>
      </View>
    );
  };

  function AdminSideDrawer() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: "#b2d8d8",
          activeTintColor: "#008080",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="AllStacks"
          options={{ title: "Home" }}
          component={AllStacks}
        />
        <Drawer.Screen
          name="AllActivityStack"
          options={{ title: "All Activities" }}
          component={AllActivityStack}
        />
        {/* <Drawer.Screen
        name="ShiftAllocationStack"
        options={{ title: "Shift Allocation" }}
        component={ShiftAllocationStack}
      /> */}
        <Drawer.Screen
          name="ReviewIncident"
          options={{ title: "Review Incident" }}
          component={ReviewIncident}
        />
        <Drawer.Screen
          name="CommunicationStack"
          options={{ title: "Communication" }}
          component={CommunicationStack}
        />
        <Drawer.Screen
          name="AboutStack"
          options={{ title: "About" }}
          component={AboutStack}
        />
      </Drawer.Navigator>
    );
  }

  function UserSideDrawer() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: "#b2d8d8",
          activeTintColor: "#008080",
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="AllStacks"
          options={{ title: "Home" }}
          component={AllStacks}
        />
        <Drawer.Screen
          name="MyActivityStack"
          options={{ title: "My Activities" }}
          component={MyActivityStack}
        />
        <Drawer.Screen
          name="MyShift"
          options={{ title: "My Shifts" }}
          component={MyShiftHome}
        />
        <Drawer.Screen
          name="ReportIncident"
          options={{ title: "Report Incident" }}
          component={ReportIncident}
        />
        <Drawer.Screen
          name="ViewIncident"
          options={{ title: "View Incident" }}
          component={ViewIncident}
        />
        <Drawer.Screen
          name="CommunicationsUserStack"
          options={{ title: "Communication" }}
          component={CommunicationsUserStack}
        />
        <Drawer.Screen
          name="AboutStack"
          options={{ title: "About" }}
          component={AboutStack}
        />
      </Drawer.Navigator>
    );
  }

  return currentUser.accessLevel == "0" ? AdminSideDrawer() : UserSideDrawer();
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
});

const mapDispatchProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AppDrawer);
