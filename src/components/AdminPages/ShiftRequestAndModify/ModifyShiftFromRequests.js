import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ListShiftDetails,
  ListUsersForModify,
  UpdateModifiedShift,
  success_false,
} from "../../../redux/actions/shiftActions/ListShiftDetailsAndUpdateAction";

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

function ModifyShiftFromRequests({
  route,
  ListShiftDetails,
  shiftDetailsListError,
  shiftDetailsForEdit,
  navigation,
  userListForShiftUpdate,
  ListUsersForModify,
  UpdateModifiedShift,
  shiftModifyUpdate,
  loading,
  success_false,
}) {
  const {
    shiftId,
    accessLevel,
    shiftDate,
    timeFrom,
    timeTo,
    requestId,
  } = route.params;
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    ListShiftDetails({ shiftId, shiftDate });
    ListUsersForModify({ accessLevel });
    if (userListForShiftUpdate) {
      mapUserList();
    }
  }, []);

  console.log(shiftId, accessLevel, shiftDate, timeTo, timeFrom, requestId);

  const mapUserList = () => {
    const List = userListForShiftUpdate.map((item) => {
      if (item.shiftDate == shiftDate) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });
    setUserList(List);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#008080" />
      </View>
    );
  }

  const onValueChange = (itemSelected, index) => {
    const newData = userList.map((item) => {
      if (item.id == itemSelected.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return {
        ...item,
        selected: item.selected,
      };
    });

    setUserList(newData);
  };

  const showData = () => {
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
        {userList.length === 0 ? (
          <View>
            <Button
              title="Refresh"
              onPress={() => {
                mapUserList();
              }}
            />
          </View>
        ) : (
          <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ marginTop: 7, flexDirection: "row", flex: 6 }}>
          <Text style={{ marginRight: 5 }}>{item.firstName}</Text>
          <Text>{item.lastName}</Text>
        </View>

        <CheckBox
          style={{ width: 40, height: 40, flex: 1 }}
          disabled={false}
          value={item.selected}
          onValueChange={() => onValueChange(item, index)}
        />
      </View>
    );
  };

  const onsubmit = () => {
    const listSelected = userList.filter((item) => item.selected == true);
    const listSelectedWithDetails = listSelected.map((item, index) => {
      return {
        ...item,
        shiftDate: shiftDate,
        timeFrom: timeFrom,
        timeTo: timeTo,
        shiftId: shiftId,
      };
    });
    UpdateModifiedShift({
      shiftId,
      selectedUsersList: listSelectedWithDetails,
      requestId,
    });
    console.log("listSelected", listSelectedWithDetails);
  };

  if (shiftDetailsListError) {
    alert(shiftDetailsListError);
  }

  if (shiftModifyUpdate === true) {
    Alert.alert(
      "SUCCESS",
      "SUCCESS",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel",
        // },
        {
          text: "OK",
          onPress: () => {
            success_false(), navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  }

  if (shiftDetailsForEdit && userListForShiftUpdate) {
    if (shiftDetailsForEdit.date < shiftDate) {
      Alert.alert(
        "SUCCESS",
        "This is a old shift",
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel",
          // },
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <View>
      <TopHeaderWithGoBack
        title={"Modify Shift"}
        navigationFunc={navigation.goBack}
      />
      {shiftDetailsForEdit && userListForShiftUpdate ? (
        <View>
          <View>
            <Text>Shift Date : {shiftDetailsForEdit.date}</Text>
            <Text>
              Shift Time From :{" "}
              {shiftDetailsForEdit.timeTo.toDate().toTimeString()}
            </Text>
            <Text>
              Shift Time To :{" "}
              {shiftDetailsForEdit.timeFrom.toDate().toTimeString()}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                Workers
              </Text>
            </View>
            <ScrollView height="45%" style={{ margin: 20, marginTop: 0 }}>
              <View>{showData()}</View>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={{ flex: 2, marginRight: 25 }}>
              <Button color="#008080" title="Cancel" onPress={() => {}} />
            </View>
            <View style={{ flex: 2, marginLeft: 25 }}>
              <Button
                color="#008080"
                title="Submit"
                onPress={() => {
                  onsubmit();
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text>Loadin</Text>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (store) => ({
  loading: store.loadinReducer.loading,
  shiftDetailsListError: store.shiftReducer.userListError, //used the same reducer type for shift_error
  shiftDetailsForEdit: store.shiftReducer.shiftDetailsForEdit,
  userListForShiftUpdate: store.shiftReducer.userListForShiftUpdate,
  shiftModifyUpdate: store.shiftReducer.shiftModifyUpdate,
  loading: store.loadinReducer.loading,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      ListShiftDetails,
      ListUsersForModify,
      UpdateModifiedShift,
      success_false,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchProps
)(ModifyShiftFromRequests);
