import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import AllActivities from "../../AdminPages/AllActivities";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../../redux/actions/userLogin";

const Stack = createStackNavigator();

const AllActivityStack = ({ navigation, logout }) => {
  return (
    <Stack.Navigator initialRouteName="AllActivities">
      <Stack.Screen
        name="AllActivities"
        component={AllActivities}
        options={() => ({
          headerStyle: {
            backgroundColor: "#008080",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: `All Activities`,
          headerRight: () => {
            return (
              <View>
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

export default connect(null, mapDispatchProps)(AllActivityStack);
