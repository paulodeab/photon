import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} >
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerItem
        label="Alarmes"
        onPress={() => props.navigation.navigate('Alarmes')}
      />
      <DrawerItem
        label="Gráficos"
        onPress={() => props.navigation.navigate('Grafico')}
      />
      <DrawerItem
        label="Relatórios"
        onPress={() => props.navigation.navigate('Relatorio')}
      />
      <DrawerItem
        label="Sair"
        onPress={() => props.navigation.navigate('Login')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f58634',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
