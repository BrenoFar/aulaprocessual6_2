import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Novo Produto
import { MaterialIcons } from '@expo/vector-icons'; // Listar Produtos
import Home from './src/screens/Home';
import Product from './src/screens/Product';
import ProductList from './src/screens/ProductList';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#6200ea',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProductList"
        component={ProductList}
        options={{
          tabBarLabel: 'Listar Produtos',
          tabBarColor: '#00796B',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="list"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarLabel: 'Novo Produto',
          tabBarColor: '#5D4037',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
