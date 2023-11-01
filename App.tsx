import * as React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, RouteProp, ParamListBase } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import BottomStack from './BottomStack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícone do botão Sair

const Stack = createStackNavigator();

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  BottomStack: undefined;
};

type Props = {
  route: RouteProp<RootStackParamList, 'BottomStack'>;
  navigation: any; // You may want to replace 'any' with the correct type for navigation
};

const getHeaderTitle = (route: RouteProp<RootStackParamList, 'BottomStack'>) => {
  // Define your getHeaderTitle logic here
  return "Header Title"; // Replace with your actual logic
};

const App = ({ route, navigation }: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomStack"
          component={BottomStack}
          options={{
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Atenção!',
                    'Deseja sair do aplicativo?',
                    [
                      {
                        text: 'Sim',
                        onPress: () => navigation.replace('Login'),
                      },
                      {
                        text: 'Não',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                    ],
                    { cancelable: false }
                  );
                }}
                style={{ padding: 10 }}
              >
                <MaterialCommunityIcons name="exit-run" color="#FFF" size={26} />
              </TouchableOpacity>
            ),
            headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
