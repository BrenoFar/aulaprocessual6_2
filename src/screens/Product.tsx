import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Separator from "../components/Separator";
import { saveItem } from "../models/ProductModel"; // Import the specific function you need

interface ProductProps {
  navigation: any; // You may want to replace 'any' with the correct type for navigation
  route: any; // You may want to replace 'any' with the correct type for route
}

const Product: React.FC<ProductProps> = ({ navigation, route }) => {
  const [state, setState] = React.useState({
    productName: "",
    productPrice: "",
    productQty: "",
  });

  const handleChangeText = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  let id = route.params ? route.params.id : undefined;

  React.useEffect(() => {
    if (!route.params) return;
    setState({
      productName: route.params.name,
      productPrice: route.params.price.toString(),
      productQty: route.params.qty.toString(),
    });
  }, [route]);

  async function handleSave() {
    if (!state.productName || !state.productPrice || !state.productQty) {
      Alert.alert(
        "Erro ao tentar cadastrar produto:",
        "Preencha todos os campos corretamente!"
      );
    } else {
      const listItem = {
        name: state.productName,
        price: parseFloat(state.productPrice),
        qty: parseInt(state.productQty),
      };

      saveItem(listItem, id) // Use the imported function directly
        .then(() => {
          setState({
            productName: "",
            productPrice: "",
            productQty: "",
          });
          Alert.alert("Dados do Produto:", "Produto salvo com sucesso!");
        })
        .then(() => navigation.navigate("ProductList", listItem))
        .catch(() =>
          Alert.alert("Erro ao tentar cadastrar produto:", "Erro no AsyncStorage!")
        );

      route.params = null;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dados do Produto</Text>
      <TextInput
        style={styles.input}
        value={state.productName}
        onChangeText={(value) => handleChangeText("productName", value)}
        placeholder={"Nome"}
        clearButtonMode="always"
      />
      <TextInput
        style={styles.input}
        value={state.productPrice}
        placeholder={"Preço"}
        onChangeText={(value) => handleChangeText("productPrice", value)}
        keyboardType="numeric"
        clearButtonMode="always"
      />
      <TextInput
        style={styles.input}
        value={state.productQty}
        placeholder={"Qtde estoque"}
        onChangeText={(value) => handleChangeText("productQty", value)}
        keyboardType="numeric"
        clearButtonMode="always"
      />
      <Separator marginVertical={30} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
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
  saveButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#E37D00",
    padding: 5,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 20,
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
});

export default Product;
