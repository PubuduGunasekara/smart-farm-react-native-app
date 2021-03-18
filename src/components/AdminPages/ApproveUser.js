import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import moment from "moment";

import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";

import TopHeaderWithGoBack from "../../components/helperComponents/topHeaderWithGoBack";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userRequestReview } from "../../redux/actions/userRequestReview";

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

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ApproveUser = ({
  userRequestReview,
  navigation,
  usersList,
  loading,
  requestEmpty,
}) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      userRequestReview();
    });
    userRequestReview();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    userRequestReview();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  if (requestEmpty) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>{requestEmpty}</Text>
      </View>
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
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <View style={{ flex: 4 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                padding: 10,
              }}
            >
              {item.firstName} {item.lastName}
            </Text>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text style={{ color: "#a8a8a8", fontSize: 12 }}>
                {moment(item.createdAt.toDate()).calendar()}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate("viewSingleUserRequest", {
                  id: item.key,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  email: item.email,
                  password: item.password,
                });
              }}
            >
              <Ionicons name="md-open" size={30} color="#008080" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const showData = () => {
    return (
      <View>
        {usersList.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#cccccc" }}>No User Requests found!</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={usersList}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Approve User"}
        navigationFunc={navigation.goBack}
      />
      <ScrollView
        height="75%"
        style={{
          padding: 20,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>{showData()}</View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (store) => ({
  usersList: store.adminReducer.usersList,
  loading: store.loadinReducer.loading,
  requestEmpty: store.adminReducer.requestEmpty,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userRequestReview }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(ApproveUser);
