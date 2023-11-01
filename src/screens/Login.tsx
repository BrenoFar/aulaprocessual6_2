import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Separator from "../components/Separator";

interface LoginProps {
  navigation: any;
  route: any;
}

const Login: React.FC<LoginProps> = ({ navigation, route }) => {
  const [registeredState, setRegisteredState] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [haveAccount, setHaveAccount] = React.useState(false);

  async function getUserData() {
    let userData = await SecureStore.getItemAsync("userData");
    if (userData) {
      setEmail(JSON.parse(userData).email);
      setRegisteredState({ ...JSON.parse(userData) });
      setHaveAccount(true);
    } else {
      setHaveAccount(false);
    }
  }

  async function handleDelete() {
    await SecureStore.deleteItemAsync("userData");
  }

  React.useEffect(() => {
    getUserData();
    const unsubscribe = navigation.addListener("focus", () => {
      getUserData();
    });
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  function handleLogin() {
    if (email.length !== 0 && password.length !== 0) {
      if (
        email === registeredState.email &&
        password === registeredState.password
      ) {
        setPassword("");
        (global as any).nameLogin = registeredState.name;
        navigation.replace("BottomStack");
      } else {
        Alert.alert(
          "Error trying to log in:",
          "Please provide correct email and password"
        );
      }
    } else {
      Alert.alert(
        "Error trying to log in:",
        "Please provide correct email and password"
      );
    }
  }

  function handleRegister() {
    setEmail("");
    setPassword("");
    navigation.navigate("Register");
  }

  function handleDeleteRegister() {
    SecureStore.deleteItemAsync("userData");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Secure Store App</Text>
      <TextInput
        style={styles.input}
        defaultValue={email}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={"E-mail"}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={(value) => setPassword(value)}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Separator marginVertical={10} />
      {!haveAccount ? (
        <>
          <Text style={styles.textSimple}>
            It's your first time here and you haven't registered yet?
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.textSimple}>Already have an account, but...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                "Information:",
                `Your password has been sent to the registered email: ${registeredState.email} ${registeredState.password}`
              )
            }
          >
            <Text style={styles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>
        </>
      )}
      <Separator marginVertical={30} />
      <Text style={styles.textSimpleJustify}>
        This app uses local storage with SecureStore and will also use AsyncStorage.
      </Text>
      <TouchableOpacity
        style={styles.saveButton} // Add the 'saveButton' style here
        onPress={handleDeleteRegister}
      >
        <Text>Delete Key</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC300",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#730000",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#E37D00",
    padding: 5,
    borderRadius: 5,
  },
  loginButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#E37D00",
    padding: 5,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#730000",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#730000",
    textAlign: "center",
  },
  input: {
    width: "90%",
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#730000",
    borderRadius: 5,
    marginBottom: 10,
  },
  textSimple: {
    color: "#730000",
  },
  textSimpleJustify: {
    color: "#730000",
    width: "95%",
    textAlign: "justify",
  },
  saveButton: { // Define the 'saveButton' style
    backgroundColor: "#E37D00",
    padding: 5,
    borderRadius: 5,
  },
});

export default Login;
