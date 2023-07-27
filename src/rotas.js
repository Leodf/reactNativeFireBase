import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Tab = createNativeStackNavigator();

import Cadastro from "./telas/Cadastro";
import DadosProduto from "./telas/DadosProduto";
import Login from "./telas/Login";
import Principal from "./telas/Principal";

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen
          name="Principal"
          component={Principal}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="DadosProduto" component={DadosProduto} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
