import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { Link, router } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import Toast from 'react-native-toast-message';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUsuario } = useUsuarioStore();


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };
  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }
    if (!validateEmail(email)) {
        Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
        return;
    }
    if (!validatePassword(password)) {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    if (email === 'email@email.com' && password === '123456') {
        try {
            setUsuario(email);
              router.push('/home');
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar acessar a próxima página.');
        }
    } else {
        Alert.alert('Erro', 'Login ou senha incorreta!');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>HydraTech</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href="/register" style={styles.buttonText}>Registrar-se</Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
