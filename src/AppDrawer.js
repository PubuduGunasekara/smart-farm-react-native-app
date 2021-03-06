import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Drawer = createDrawerNavigator();

function AdminSideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AllStacks"
        options={{ title: "Home" }}
        component={AllStacks}
      />
      <Drawer.Screen
        name="AllActivities"
        options={{ title: "All Activities" }}
        component={AllActivities}
      />
      <Drawer.Screen
        name="ShiftAllocation"
        options={{ title: "Shift Allocation" }}
        component={ShiftAllocation}
      />
      <Drawer.Screen
        name="ReviewIncident"
        options={{ title: "Review Incident" }}
        component={ReviewIncident}
      />
      <Drawer.Screen
        name="Communication"
        options={{ title: "Communication" }}
        component={Communication}
      />
      <Drawer.Screen
        name="About"
        options={{ title: "About" }}
        component={About}
      />
    </Drawer.Navigator>
  );
}

function UserSideDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="AllStacks"
        options={{ title: "Home" }}
        component={AllStacks}
      />
      <Drawer.Screen
        name="MyActivities"
        options={{ title: "My Activities" }}
        component={MyActivities}
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
        name="CommunicationUser"
        options={{ title: "Communication" }}
        component={CommunicationUser}
      />
      <Drawer.Screen
        name="About"
        options={{ title: "About" }}
        component={About}
      />
    </Drawer.Navigator>
  );
}

const AppDrawer = ({ currentUser }) => {
  return currentUser.accessLevel == "0" ? AdminSideDrawer() : UserSideDrawer();
};

const mapStateToProps = (store) => ({
  currentUser: store.userReducer.user,
});

export default connect(mapStateToProps, null)(AppDrawer);
