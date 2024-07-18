import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
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
      navigation.replace('Main');
    } else {
      setErrorMessage("Falha ao realizar o login. Verifique suas credenciais.");
    }
  }
  
  return (
    <View style={styles.backgroundContainer}>
      <Image source={require('../img/fundo.png')} style={styles.backgroundImage} />
      <View style={styles.container}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
        
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(e) => setEmail(e)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          placeholderTextColor="#000000"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={(e) => setSenha(e)}
          secureTextEntry
          placeholder="Digite sua senha"
          placeholderTextColor="#000000"
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity onPress={logar} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'white', // Cor de fundo padrão
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    padding: 20,
  },
  logo: {
    marginBottom: 20, // Espaçamento abaixo da imagem
  },
  label: {
    color: '#000', // Texto preto
    marginBottom: 5,
    fontSize: 24,
  },
  input: {
    width: '100%', // Garante que o campo de entrada use toda a largura disponível
    height: 40,
    borderColor: '#F58634',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#000000', // Texto do campo de entrada preto
    backgroundColor: '#FFF',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 22,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F58634',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
