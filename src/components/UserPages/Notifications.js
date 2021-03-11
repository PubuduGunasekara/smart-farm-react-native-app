import React, { useState, useEffect } from "react";
import { View, Text, RefreshControl } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getNotifications } from "../../redux/actions/notificationActions";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Notifications = ({
  navigation,
  getNotifications,
  userNotifications,
  currentUser,
}) => {
  const [notificationsData, setNotificationsData] = useState(userNotifications);
  useEffect(() => {
    if (notificationsData.length === 0) {
      getNotifications({ userId: currentUser.userId });
    }
    navigation.addListener("focus", () => {
      getNotifications({ userId: currentUser.userId });
    });
    setNotificationsData(userNotifications);
  }, [userNotifications]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNotifications({ userId: currentUser.userId });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginTop: 7, flexDirection: "row" }}>
        <Text style={{ marginRight: 5, color: "black" }}>
          First name : {item.firstName}
        </Text>

        <Text>
          {moment(item.createdAt.toDate()).startOf("seconds").fromNow()}
        </Text>
      </View>
    );
  };

  const showNotfications = () => {
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
          data={notificationsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Notifications"}
        navigationFunc={navigation.goBack}
      />
      <View>
        {notificationsData.length !== 0 && notificationsData ? (
          <ScrollView
            height="80%"
            style={{ margin: 20, marginTop: 0 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View>
              {showNotfications()}
              {/* {(showNotfications(), console.log("Noti", notificationsData))}
              <Text>{JSON.stringify(notificationsData)}</Text> */}
            </View>
          </ScrollView>
        ) : (
          <Text>No notifications</Text>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  userNotifications: store.notificationsReducer.userNotifications,
  currentUser: store.userReducer.user,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      getNotifications,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Notifications);
