import React, { useState, useEffect } from "react";
import { View, Text, RefreshControl } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMessageUser } from "../../redux/actions/communicationsActions";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const CommunicationUser = ({
  navigation,
  getMessageUser,
  userMessages,
  currentUser,
}) => {
  const [userMessageData, setUserMessageData] = useState(userMessages);
  useEffect(() => {
    navigation.addListener("focus", () => {
      getMessageUser({ accessLevel: currentUser.accessLevel });
    });

    // if (userMessageData.length === 0) {
    //   getMessageUser({ accessLevel: currentUser.accessLevel });
    // }
    setUserMessageData(userMessages);
  }, [userMessages]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMessageUser({ accessLevel: currentUser.accessLevel });
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
          <View style={{ flex: 1 }}></View>
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
        <FlatList
          data={userMessageData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <View>
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

      <View>
        <ScrollView
          height="92%"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {userMessageData.length !== 0 && userMessageData ? (
            <View
              style={{
                margin: 20,
              }}
            >
              {showMessage()}
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
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  currentUser: store.userReducer.user,
  userMessages: store.communicationReducer.userMessages,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      getMessageUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(CommunicationUser);
