import React from "react";
import {useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import useFonts from "./constants/useFonts";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

enableScreens(false);

import CustomDrawer from './navigation/CustomDrawer';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/rootReducer";

import { Recipe } from "./screens";

const Stack = createStackNavigator();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const App = () => {
    const [IsReady, SetIsReady] = useState(false);

    const LoadFonts = async () => {
      await useFonts();
    };
  
    if (!IsReady) {
      return (
        <AppLoading
          startAsync={LoadFonts}
          onFinish={() => SetIsReady(true)}
          onError={() => {}}
        />
      );
    }
    
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen
                    name="Home"
                    component={CustomDrawer}
                />

                <Stack.Screen name="Recipe" component={Recipe}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
    );
}

export default App