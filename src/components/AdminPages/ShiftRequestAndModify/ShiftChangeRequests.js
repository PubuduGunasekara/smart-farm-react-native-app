import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

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
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  const confirmDelete = ({ id }) => {
    Alert.alert(
      "DELETE",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteShiftMessage({ id }), Delete_false();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Shift Change Requests"}
        navigationFunc={navigation.goBack}
      />

      <View>
        {shiftRequestMessagesSuccess === true ? (
          <ScrollView height="90%">
            <View style={{ margin: 20 }}>
              <FlatList
                data={shiftRequestMessagesForAdmin}
                keyExtractor={(item) => item.requestId}
                renderItem={({ item }) => (
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
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          Shift Date :{" "}
                        </Text>
                      </View>
                      <View>
                        <Text>{item.shiftDate}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          Time :{" "}
                        </Text>
                      </View>
                      <View>
                        <Text>
                          From{moment(item.timeFrom.toDate()).format(" h:mm a")}{" "}
                          to
                          {moment(item.timeTo.toDate()).format(" h:mm a")}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          Name :{" "}
                        </Text>
                      </View>
                      <View>
                        <Text>
                          {item.firstName} {item.lastName}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                      <View>
                        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                          Reason :{" "}
                        </Text>
                      </View>
                      <View>
                        <Text>{item.reason}</Text>
                      </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          borderRightWidth: 1,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            padding: 10,
                          }}
                          onPress={() => {
                            confirmDelete({ id: item.requestId });
                          }}
                        >
                          <AntDesign name="delete" size={30} color="#870404" />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            padding: 10,
                          }}
                          onPress={() => {
                            navigation.navigate("ModifyShiftFromRequests", {
                              shiftId: item.shiftId,
                              accessLevel: item.accessLevel,
                              shiftDate: item.shiftDate,
                              timeTo: item.timeTo,
                              timeFrom: item.timeFrom,
                            });
                          }}
                        >
                          <AntDesign name="edit" size={30} color="#008080" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
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
