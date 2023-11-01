import * as React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ProductItem from "../components/ProductItem";
import { getItems } from "../models/ProductModel"; // Import the specific function you need

interface ProductListProps {
  navigation: any; // You may want to replace 'any' with the correct type for navigation
  route: any; // You may want to replace 'any' with the correct type for route
}

const ProductList: React.FC<ProductListProps> = ({ navigation, route }) => {
  const [items, setItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    getItems().then((items) => setItems(items));

    const unsubscribe = navigation.addListener("focus", () => {
      getItems().then((items) => setItems(items));
    });

    return () => {
      unsubscribe();
    };
  }, [route]);

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        data={items}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({ item }) => (
          <ProductItem item={item} navigation={navigation} />
        )}
      />
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
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
});

export default ProductList;
