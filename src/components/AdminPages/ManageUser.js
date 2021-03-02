import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CheckBox from "@react-native-community/checkbox";

export default function ManageUser() {
  const [data, setdata] = useState([
    { id: "1", name: "one" },
    { id: "2", name: "two" },
    { id: "3", name: "three" },
    { id: "4", name: "four" },
    { id: "5", name: "five" },
    { id: "6", name: "six" },
  ]);

  const onValueChange = (itemSelected, index) => {
    const newData = data.map((item) => {
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
    console.log(itemSelected);
    setdata(newData);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 5, flexDirection: "row" }}>
        <Text>
          Name :{item.name} id : {item.id}
        </Text>
        <CheckBox
          style={{ width: 40, height: 40 }}
          disabled={false}
          value={item.selected}
          onValueChange={() => onValueChange(item, index)}
          style={{ alignSelf: "center" }}
        />
      </View>
    );
  };

  const onShowItemsSelected = () => {
    const listSelected = data.filter((item) => item.selected == true);
    let alert = "";
    const dataArray = [];
    listSelected.forEach((item) => {
      alert = alert + `${item.name},` + item.id + `\n`;
      dataArray[{ item }];
    });

    console.log(listSelected);
    Alert.alert(alert);
  };
  const showData = () => {
    return (
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Button title="on submit" onPress={onShowItemsSelected} />
      </View>
    );
  };

  return <View>{showData()}</View>;
}
