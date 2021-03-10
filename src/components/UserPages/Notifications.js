import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import moment from "moment";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getNotifications } from "../../redux/actions/notificationActions";

import TopHeaderWithGoBack from "../helperComponents/topHeaderWithGoBack";

const Notifications = ({
  navigation,
  getNotifications,
  userNotifications,
  currentUser,
}) => {
  const [notificationsData, setNotificationsData] = useState(userNotifications);
  useEffect(() => {
    getNotifications({ userId: currentUser.userId });
    navigation.addListener("focus", () => {
      setNotificationsData(userNotifications);
    });
    setNotificationsData(userNotifications);
  }, [userNotifications]);

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
          <ScrollView height="80%" style={{ margin: 20, marginTop: 0 }}>
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
