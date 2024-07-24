import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {

  const logout = async () => {
    await AsyncStorage.removeItem('user_token');
    // Reset the navigation state to only include the Login screen
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <DrawerItem
        label="Alarmes"
        onPress={() => props.navigation.navigate('Alarmes')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerOption}
        icon={() => <Icon name="notifications" size={24} color="#ffffff" />}
      />
      <DrawerItem
        label="Gráficos"
        onPress={() => props.navigation.navigate('Gráficos')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerOption}
        icon={() => <Icon name="bar-chart" size={24} color="#ffffff" />}
      />
      <DrawerItem
        label="Relatórios"
        onPress={() => props.navigation.navigate('Relatórios')}
        labelStyle={styles.drawerLabel}
        style={styles.drawerOption}
        icon={() => <Icon name="description" size={24} color="#ffffff" />}
      />
      <DrawerItem
        label="Sair"
        onPress={logout}
        labelStyle={styles.drawerLabel}
        style={styles.drawerOption}
        icon={() => <Icon name="exit-to-app" size={24} color="#ffffff" />}
      />
    </DrawerContentScrollView>
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
  },
  drawerLabel: {
    color: '#ffffff', // Cor branca para as opções do menu
    fontWeight: 'bold',
    fontSize: 18
  },
  drawerOption: {
    borderWidth: 1,
    borderColor: '#ffffff', // Cor branca para as bordas
    borderRadius: 5, // Bordas arredondadas
    marginVertical: 5, // Espaçamento vertical entre as opções
    paddingHorizontal: 10, // Espaçamento horizontal interno
    paddingVertical: 8, // Espaçamento vertical interno
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Cor de fundo com opacidade
  },
});

export default CustomDrawerContent;
