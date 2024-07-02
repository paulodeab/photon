import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import Login from '../service/Login';

const LoginScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function logar() {
    const login = new Login(email, senha);
    const status = await login.logar();

    if (status === 200) {
      setErrorMessage("");
      navigation.navigate('Menu');
    } else {
      setErrorMessage("Falha ao realizar o login. Verifique suas credenciais.");
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(e) => setEmail(e)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Senha</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={(e) => setSenha(e)}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Button
        title="Entrar"
        onPress={logar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});


export default LoginScreen;