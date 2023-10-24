import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("BottomTabBar");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Welcome!!</Text>
        </View>
        <View style={styles.formBox}>
          <View style={styles.formInput}>
            <Image
              source={require("../assets/icon/User_box_duotone.png")}
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChange={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.formInput}>
            <Image
              source={require("../assets/icon/View_alt_fill.png")}
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChange={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>
          <Text style={styles.forgot}>Lupa kata sandi ?</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleLogin}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#79AC78",
    padding: 20,
  },
  title: {
    flexDirection: "row",
    fontWeight: "400",
  },
  titleText: {
    textAlign: "left",
    color: "#D0E7D2",
    fontSize: 30,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  formBox: {
    marginTop: 10,
    backgroundColor: "#D0E7D2",
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  formInput: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    height: 50,
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#B0D9B1",
    color: "#D0E7D2",
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  forgot: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    color: "#79AC78",
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 150,
    backgroundColor: "#79AC78",
  },
  buttonText: {
    padding: 10,
    textAlign: "center",
    color: "#D0E7D2",
  },
});
