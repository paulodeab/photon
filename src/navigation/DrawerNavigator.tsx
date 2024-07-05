import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { View, Text } from 'react-native';
import AlarmeScreen from '../screens/AlarmeScreen';
import GraficoScreen from '../screens/GraficoScreen';
import RelatorioScreen from '../screens/RelatorioScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Alarmes" component={AlarmeScreen} />
      <Drawer.Screen name="Grafico" component={GraficoScreen} />
      <Drawer.Screen name="Relatorio" component={RelatorioScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
