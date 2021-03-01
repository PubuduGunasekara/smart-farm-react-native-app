import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const ApproveUser = ({
  userRequestReview,
  navigation,
  usersList,
  loading,
  requestEmpty,
}) => {
  useEffect(() => {
    userRequestReview();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  console.log("empty", requestEmpty);
  if (requestEmpty) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>{requestEmpty}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={usersList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <Button
              style={{ width: "100%" }}
              title={item.key}
              onPress={() => {
                navigation.navigate("viewSingleUserRequest", {
                  id: item.key,
                  firstName: item.firstName,
                  lastName: item.lastName,
                  email: item.email,
                  password: item.password,
                });
              }}
            />
            <Text>User Name: {item.firstName}</Text>
            <Text>User ID: {item.key}</Text>
            <Text>User password: {item.password}</Text>
          </View>
        )}
      />
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
