import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const TopHeaderWithGoBack = ({ title, navigationFunc }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "stretch",
        marginTop: 5,
      }}
    >
      <View style={{ alignItems: "stretch" }}>
        <TouchableOpacity onPress={() => navigationFunc()}>
          <Ionicons
            style={{ marginRight: 0, paddingRight: 0 }}
            name="chevron-back"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
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
          {title}
        </Text>
      </View>
    </View>
  );
};

export default TopHeaderWithGoBack;
