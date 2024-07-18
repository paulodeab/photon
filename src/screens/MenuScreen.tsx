import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AlarmeScreen from './AlarmeScreen';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AlarmeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58634'
  },
});

export default MenuScreen;