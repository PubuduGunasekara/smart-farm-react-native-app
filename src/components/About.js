// import React from "react";
// import { View, Text } from "react-native";

// export default function About() {
//   return (
//     <View>
//       <Text>About</Text>
//     </View>
//   );
// }

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  text1: {
    fontSize: 20,
  },

  text2: {
    fontSize: 19,
    fontStyle: "italic",
  },
  row: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 50,
    marginBottom: 5,
  },
  row1: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 50,
  },

  centerView: {
    paddingTop: 100,
    paddingLeft: 60,
  },

  front: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
});

export default function About() {
  return (
    <KeyboardAvoidingView contentContainerStyle={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "stretch",
          marginTop: 5,
        }}
      >
        <View style={{ alignItems: "stretch", marginLeft: 20 }}></View>
        <View style={{ alignItems: "stretch" }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginLeft: 0,
              paddingLeft: 0,
              marginTop: 3,
            }}
          >
            About
          </Text>
        </View>
      </View>
      <View>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            marginTop: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      </View>

      <View style={styles.centerView}>
        <View style={styles.row}>
          <Text style={styles.front}>Smart Farm Application </Text>
        </View>
        <View style={styles.row1}>
          <Text style={styles.text1}>by </Text>
          <Text style={styles.front}>TeamEnigma </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text2}>Version 1.0 </Text>
        </View>
      </View>
      <View></View>
    </KeyboardAvoidingView>
  );
}
