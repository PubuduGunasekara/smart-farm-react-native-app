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
      <View style={{ marginTop: 7, flexDirection: "row" }}>
        <Text style={{ marginRight: 5, color: "black" }}>{item.message}</Text>

        <Text>
          {moment(item.createdAt.toDate()).startOf("seconds").fromNow()}
        </Text>
      </View>
    );
  };

  const showMessage = () => {
    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          flex: 1,
          elevation: 100,
          margin: 20,
        }}
      >
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
    <View>
      <TopHeaderWithGoBack
        title={"Communication"}
        navigationFunc={navigation.goBack}
      />
      <View
        style={{
          flexDirection: "row",
          margin: 30,
          marginTop: 10,
          marginBottom: 0,
        }}
      >
        <View style={{ flex: 2 }}>
          <Text style={{ margin: 0, paddingTop: 15 }}>Audience : </Text>
        </View>

        <View style={{ flex: 3 }}>
          <Picker
            selectedValue={WorkGroupLevel}
            onValueChange={(level, itemIndex) => {
              submitWorkGroupLevel({ level });
            }}
            style={{ paddingBottom: 10 }}
          >
            <Picker.Item label="Select Access Level" value="4" />
            <Picker.Item label="Controller Admin Level" value="1" />
            <Picker.Item label="Food & Water controller Level" value="2" />
            <Picker.Item label="Cleaning Controller Level" value="3" />
          </Picker>
        </View>
      </View>
      <View style={{ margin: 30, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: "#ddf8f8",
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
            numberOfLines={4}
            maxHeight={80}
            value={message}
            placeholder="Enter message"
            onChangeText={(text) => setMessage(text)}
          />
        </View>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}>
            <Button
              color="#008080"
              title="Send"
              onPress={() => {
                onsubmit();
              }}
            />
          </View>
        </View>
      </View>
      <View style={{ margin: 30, marginTop: 10 }}>
        <Text>Previous messages</Text>
        <View>
          {messagesData.length !== 0 && messagesData ? (
            <View>
              {loading ? (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#008080" />
                </View>
              ) : (
                <ScrollView height="62%" style={{ margin: 20, marginTop: 0 }}>
                  {showMessage()}
                </ScrollView>
              )}
            </View>
          ) : (
            <Text>No Message</Text>
          )}
        </View>
      </View>
    </View>
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
