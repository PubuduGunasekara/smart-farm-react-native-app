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

    if (userMessageData.length === 0) {
      getMessageUser({ accessLevel: currentUser.accessLevel });
    }
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
      <TopHeaderWithGoBack
        title={"Communications"}
        navigationFunc={navigation.goBack}
      />
      <View style={{ height: "90%" }}>
        {userMessageData.length !== 0 && userMessageData ? (
          <ScrollView
            height="80%"
            style={{ margin: 20, marginTop: 0 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              {showMessage()}
              {/* {(showNotfications(), console.log("Noti", notificationsData))}
              <Text>{JSON.stringify(notificationsData)}</Text> */}
            </View>
          </ScrollView>
        ) : (
          <Text>No messages</Text>
        )}
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
