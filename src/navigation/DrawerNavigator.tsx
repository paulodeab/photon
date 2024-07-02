import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { View, Text } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Menu"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
      <Drawer.Screen name="Alarms" component={() => <View><Text>Alarms Page</Text></View>} />
      <Drawer.Screen name="Charts" component={() => <View><Text>Charts Page</Text></View>} />
      <Drawer.Screen name="Reports" component={() => <View><Text>Reports Page</Text></View>} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
