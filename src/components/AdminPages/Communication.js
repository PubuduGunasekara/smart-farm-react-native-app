import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import moment from "moment";

import { Picker } from "@react-native-community/picker";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  sendMessage,
  getMessageAdmin,
} from "../../redux/actions/communicationsActions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const Communication = ({
  navigation,
  sendMessage,
  messageAdminError,
  adminMessages,
  getMessageAdmin,
  loading,
}) => {
  const [WorkGroupLevel, setWorkGroupLevel] = useState("");
  const [message, setMessage] = useState("");

  const [messagesData, setMessagesData] = useState(adminMessages);

  useEffect(() => {
    if (messagesData.length === 0) {
      getMessageAdmin();
    }
    navigation.addListener("focus", () => {
      getMessageAdmin();
    });
    setMessagesData(adminMessages);
  }, [adminMessages]);

  const submitWorkGroupLevel = ({ level }) => {
    if (level === "4") {
      return alert("Please select your Audience.");
    } else {
      setWorkGroupLevel(level);
    }
  };

  const onsubmit = () => {
    if (WorkGroupLevel === "") {
      return alert("Please select your Audience.");
    } else if (message === "") {
      return alert("Please type a message");
    } else {
      sendMessage({ WorkGroupLevel, message });

      getMessageAdmin();
      setMessage("");
    }
  };

  if (messageAdminError === true) {
    Alert.alert(
      "ERROR",
      "SOMETHING WENT WRONG!",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"),
        },
      ],
      { cancelable: false }
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#b2d8d8",
          borderWidth: 1,
          borderRadius: 1,
          borderColor: "#ddd",
          borderBottomWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 1,
          elevation: 3,
          marginBottom: 10,
          padding: 10,
        }}
      >
        <View style={{ marginBottom: 5 }}>
          <View>
            <Text>{item.message}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#a8a8a8", fontSize: 12 }}>
              Level - {item.accessLevel}
            </Text>
          </View>
          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <Text style={{ color: "#a8a8a8", fontSize: 12 }}>
              {moment(item.createdAt.toDate()).calendar()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const showMessage = () => {
    return (
      <View>
        {console.log("calling")}
        <FlatList
          data={messagesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
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
            Communications
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          margin: 20,
          marginTop: 10,
          marginBottom: 0,
        }}
      >
        <View style={{ flex: 2 }}>
          <Picker
            selectedValue={WorkGroupLevel}
            onValueChange={(level, itemIndex) => {
              submitWorkGroupLevel({ level });
            }}
            color="#008080"
            style={{ margin: 0, padding: 0 }}
          >
            <Picker.Item label="Select Access Level" value="4" />
            <Picker.Item label="Controller Admin Level" value="1" />
            <Picker.Item label="Food & Water controller Level" value="2" />
            <Picker.Item label="Cleaning Controller Level" value="3" />
          </Picker>
        </View>
      </View>
      <View style={{ margin: 20, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: "#b2d8d8",
            borderWidth: 1,
            borderRadius: 1,
            borderColor: "#ddd",
            borderBottomWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 1,
            elevation: 3,
          }}
        >
          <TextInput
            editable
            multiline={true}
            numberOfLines={6}
            maxHeight={80}
            value={message}
            placeholder="Enter message"
            onChangeText={(text) => setMessage(text)}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#008080",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                onsubmit();
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>SEND</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ margin: 20, marginTop: 10 }}>
        <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
          Previous Messages
        </Text>
        <View>
          {messagesData.length !== 0 && messagesData ? (
            <View>
              {loading ? (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#008080" />
                </View>
              ) : (
                <ScrollView height="70%">{showMessage()}</ScrollView>
              )}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#cccccc" }}>No Messages</Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  messageAdminError: store.communicationReducer.messageAdminError,
  adminMessages: store.communicationReducer.adminMessages,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ sendMessage, getMessageAdmin }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Communication);
