import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ShowShiftChangesRequest } from "../../../redux/actions/shiftActions/ShowShiftChangesRequestsAction";
import {
  deleteShiftMessage,
  Delete_false,
} from "../../../redux/actions/shiftActions/RequestShiftChange";

import TopHeaderWithGoBack from "../../helperComponents/topHeaderWithGoBack";

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

const ShiftChangeRequests = ({
  shiftRequestMessagesForAdmin,
  ShowShiftChangesRequest,
  loading,
  navigation,
  deleteShiftMessage,
  shiftRequestMessagesDelete,
  Delete_false,
  shiftRequestMessagesSuccess,
}) => {
  useEffect(() => {
    navigation.addListener("blur", () => {
      ShowShiftChangesRequest();
    });
    navigation.addListener("focus", () => {
      ShowShiftChangesRequest();
    });
    ShowShiftChangesRequest();
  }, [shiftRequestMessagesDelete]);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Shift Change Requests"}
        navigationFunc={navigation.goBack}
      />

      <View>
        {shiftRequestMessagesSuccess === true ? (
          <FlatList
            data={shiftRequestMessagesForAdmin}
            keyExtractor={(item) => item.requestId}
            renderItem={({ item }) => (
              <View style={{ margin: 20, marginBottom: 30 }}>
                <Button
                  style={{ width: "100%" }}
                  title="Delete"
                  onPress={() => {
                    deleteShiftMessage({ id: item.requestId }), Delete_false();
                  }}
                />
                <Button
                  style={{ width: "100%" }}
                  title="Modify"
                  onPress={() => {
                    navigation.navigate("ModifyShiftFromRequests", {
                      shiftId: item.shiftId,
                      accessLevel: item.accessLevel,
                      shiftDate: item.shiftDate,
                      timeTo: item.timeTo,
                      timeFrom: item.timeFrom,
                      requestId: item.requestId,
                    });
                  }}
                />
                <Text>request ID: {item.requestId}</Text>
                <Text>User Name: {item.firstName}</Text>
                <Text>User ID: {item.currentUserid}</Text>
                <Text>Reason: {item.reason}</Text>
                <Text>User shift date: {item.shiftDate}</Text>
                <Text>
                  User time from: {item.timeFrom.toDate().toTimeString()}
                </Text>
                <Text>User to: {item.timeTo.toDate().toTimeString()}</Text>
                <Text>{item.shiftId}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No request found</Text>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  shiftRequestMessagesForAdmin: store.shiftReducer.shiftRequestMessagesForAdmin,
  shiftRequestMessagesDelete: store.shiftReducer.shiftRequestMessagesDelete,
  shiftRequestMessagesSuccess: store.shiftReducer.shiftRequestMessagesSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      ShowShiftChangesRequest,
      deleteShiftMessage,
      Delete_false,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(ShiftChangeRequests);
