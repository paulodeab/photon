import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // ou qualquer outro conjunto de ícones que você preferir
import LoginScreen from '../screens/LoginScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import AlarmeScreen from '../screens/AlarmeScreen';
import GraficoScreen from '../screens/GraficoScreen';
import RelatorioScreen from '../screens/RelatorioScreen';
import MainScreen from '../screens/MainScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#FFF',
        drawerActiveBackgroundColor: '#F58634',
        drawerStyle: {
          backgroundColor: '#F58634',
        },
        headerStyle: {
          backgroundColor: '#F58634',
          height: 100, // Aumenta a altura da barra
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontSize: 24, // Ajusta o tamanho do texto do título
        },
      }}
    >
      <Drawer.Screen
        name="Menu"
        component={MainScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="menu" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Alarmes"
        component={AlarmeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Gráficos"
        component={GraficoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="bar-chart" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Relatórios"
        component={RelatorioScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="description" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F58634',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  drawerItem: {
    backgroundColor: '#F58634',
    fontWeight: 'bold',
  },
});

export default DrawerNavigator;

