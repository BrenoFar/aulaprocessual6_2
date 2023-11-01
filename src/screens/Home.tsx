import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HomeProps {
  navigation: any; // You may want to replace 'any' with the correct type for navigation
  route: any; // You may want to replace 'any' with the correct type for route
}

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  async function handleProductsDelete() {
    try {
      await AsyncStorage.clear();
      Alert.alert(
        "Cadastro de Produtos:",
        "Todos os produtos foram excluídos com sucesso!"
      );
    } catch (error) {
      Alert.alert("Erro na exclusão de produtos:", error as string);
    }
  }

  // Assuming global is of type any
  const nameLogin: string = (global as any).nameLogin;

  return (
    <View style={styles.container}>
      <Text>Tela Home</Text>
      <Text>Olá {nameLogin}, seja bem-vindo!</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleProductsDelete}>
        <Text>Deletar Todos os Produtos</Text>
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
  saveButton: {
    width: "50%",
    height: 40,
    backgroundColor: "#E37D00",
    padding: 5,
    borderRadius: 5,
  },
});

export default Home;
