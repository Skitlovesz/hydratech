import  React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';


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
    <ImageBackground
      source={require('../assets/imagens/background.png')}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="water" size={80} color="#4FC3F7" />
          <Text style={styles.title}>HydraTech</Text>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0BEC5"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#B0BEC5"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton}>
          <Link href="/register" style={styles.registerButtonText}>Registrar-se</Link>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: 15,
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4FC3F7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});