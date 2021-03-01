import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userRegister } from "../../redux/actions/userRegister";

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

const Register = ({ registerError, registerSuccess, userRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setloading] = useState(false);

  const onSignUp = () => {
    userRegister({ firstName, lastName, email, password });
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    // if (registerError) {
    //   alert(registerError);
    //   setloading(false);
    // }

    // if (registerSuccess) {
    //   alert(registerSuccess);
    //   setloading(false);
    // }

    // if (!registerSuccess && !registerError) {
    //   setloading(true);
    // }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View>
      <TextInput
        value={firstName}
        placeholder="First name"
        onChangeText={(firstName) => setFirstName(firstName)}
      />
      <TextInput
        value={lastName}
        placeholder="Last name"
        onChangeText={(lastName) => setLastName(lastName)}
      />
      <TextInput
        value={email}
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        value={confirmPassword}
        placeholder="Confirm password"
        secureTextEntry={true}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Button
        onPress={() => {
          onSignUp();
        }}
        title="SIgn Up"
      />
    </View>
  );
};

const mapStateToProps = (store) => ({
  registerError: store.userReducer.registerError,
  registerSuccess: store.userReducer.registerSuccess,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ userRegister }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Register);

// class Register extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       eamil: "",
//       password: "",
//       confirmPassword: "",
//     };

//     this.onSignUp = this.onSignUp.bind(this);
//   }

//   async onSignUp() {
//     const {
//       firstName,
//       lastName,
//       email,
//       password,
//       confirmPassword,
//     } = this.state;

//     console.log(`${firstName}${lastName}${email}${password}${confirmPassword}`);

//     const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//     const data = {
//       firstName,
//       lastName,
//       email,
//       password,
//       createdAt: timestamp,
//     };

//     firebase;
//     //   .firestore()
//     //   .collection("tempUser")
//     //   .set(data)
//     //   .then((data) => {
//     //     //setEntityText("");
//     //     //Keyboard.dismiss();
//     //     console.log(data);
//     //     alert(data);
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });

//     firebase
//       .firestore()
//       .collection("tempUser")
//       .get()
//       .then((data) => {
//         console.log("data", data.data());
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });

//     // await firebase
//     //   .database()
//     //   .ref("Users/")
//     //   .push({
//     //     firstName,
//     //     lastName,
//     //     email,
//     //     password,
//     //   })
//     //   .then((data) => {
//     //     //success callback
//     //     console.log("data ", data);
//     //   })
//     //   .catch((error) => {
//     //     //error callback
//     //     console.log("error ", error);
//     //   });

//     // firebase
//     //   .database()
//     //   .ref("Users/")
//     //   .once("value", function (snapshot) {
//     //     console.log(snapshot.val());
//     //   });

//     // firebase.database().ref("Users/").remove();
//   }

//   render() {
//     const { navigation } = this.props;

//     return (
//       <View>
//         <TextInput
//           placeholder="First name"
//           onChangeText={(firstName) => this.setState({ firstName })}
//         />
//         <TextInput
//           placeholder="Last name"
//           onChangeText={(lastName) => this.setState({ lastName })}
//         />
//         <TextInput
//           placeholder="Email"
//           onChangeText={(email) => this.setState({ email })}
//         />
//         <TextInput
//           placeholder="Password"
//           secureTextEntry={true}
//           onChangeText={(password) => this.setState({ password })}
//         />
//         <TextInput
//           placeholder="Confirm password"
//           secureTextEntry={true}
//           onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
//         />
//         <Button onPress={() => this.onSignUp()} title="SIgn Up" />
//       </View>
//     );
//   }
// }

// export default function (props) {
//   const navigation = useNavigation();

//   return <Register {...props} navigation={navigation} />;
// }
