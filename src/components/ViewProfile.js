import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { employeeFetch, employeeUpdate } from "../redux/actions/EmployeeAction";

import TopHeaderWithGoBack from "../../src/components/helperComponents/topHeaderWithGoBack";
import Icon from "react-native-vector-icons/FontAwesome5";

import { AntDesign } from "@expo/vector-icons";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
    };
  }

  componentDidMount() {
    //   const { personData } = this.props;
    //   this.props.watchPersonData({ personData });
    this.props.employeeFetch();
  }

  render() {
    const showPassword = () => {
      this.setState({
        hide: false,
      });
    };

    return (
      <View>
        <TopHeaderWithGoBack
          title={"View Profile"}
          navigationFunc={this.props.navigation.goBack}
        />
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
            padding: 30,
            margin: 20,
            marginTop: 20,
            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ marginBottom: 50, alignItems: "center" }}>
            <Feather name="user" size={60} />
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  // alignSelf: "flex-start",
                  // alignContent: "flex-start",
                }}
              >
                First Name :{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.textStyle}>{this.props.firstName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "flex-start",
                }}
              >
                Last Name :{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.textStyle}>{this.props.lastName}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                AccessLevel :{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.textStyle}>{this.props.accessLevel}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Email : </Text>
            </View>
            <View>
              <Text style={styles.textStyle}>{this.props.email}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  alignSelf: "flex-start",
                }}
              >
                Password :{" "}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 5 }}>
              <Text style={styles.textStyle}>
                {" "}
                {this.state.hide ? (
                  this.props.password
                ) : (
                  <Text>********</Text>
                )}{" "}
              </Text>

              <View style={{ marginLeft: 5 }}>
                <TouchableOpacity
                  onPress={() => this.setState({ hide: !this.state.hide })}
                >
                  {this.state.hide ? (
                    <Icon name={"eye-slash"} size={20} color="grey" />
                  ) : (
                    <Icon name={"eye"} size={20} color="grey" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
  },
});

const mapStateToProps = ({ employee }) => {
  const { firstName, lastName, email, accessLevel, password } = employee;
  return { firstName, lastName, email, accessLevel, password };
};

export default connect(mapStateToProps, { employeeFetch, employeeUpdate })(
  ViewProfile
);
