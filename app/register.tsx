// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
// import { router } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleRegister = () => {
//     if (!name || !email || !password || !confirmPassword) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos.');
//       return;
//     }
//     if (!validateEmail(email)) {
//       Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Erro', 'As senhas não coincidem.');
//       return;
//     }
//     Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
//     router.push('/');
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/imagens/background.png')}
//       style={styles.backgroundImage}
//     >
//       <LinearGradient
//         colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
//         style={styles.container}
//       >
//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//           <View style={styles.logoContainer}>
//             <Ionicons name="water" size={60} color="#4FC3F7" />
//             <Text style={styles.title}>Registrar-se</Text>
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="person-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Nome"
//               placeholderTextColor="#B0BEC5"
//               value={name}
//               onChangeText={setName}
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="mail-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#B0BEC5"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Senha"
//               placeholderTextColor="#B0BEC5"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Ionicons name="lock-closed-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Confirmar Senha"
//               placeholderTextColor="#B0BEC5"
//               value={confirmPassword}
//               onChangeText={setConfirmPassword}
//               secureTextEntry
//             />
//           </View>

//           <TouchableOpacity style={styles.button} onPress={handleRegister}>
//             <Text style={styles.buttonText}>Cadastrar</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.backToLogin} onPress={() => router.push('/')}>
//             <Text style={styles.linkText}>Voltar para Login</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </LinearGradient>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginTop: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   inputIcon: {
//     padding: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#FFFFFF',
//     paddingVertical: 10,
//     paddingRight: 10,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#4FC3F7',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   backToLogin: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#4FC3F7',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../config/firebase-config';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      // Validações
      if (!name || !email || !password || !confirmPassword) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }
      if (!validateEmail(email)) {
        Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }

      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Salvar dados adicionais no Firestore
      await setDoc(doc(firestore, 'usuarios', userCredential.user.uid), {
        nome: name,
        email: email,
        createdAt: new Date().toISOString()
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.push('/');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar o usuário, tente novamente');
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="water" size={60} color="#4FC3F7" />
            <Text style={styles.title}>Registrar-se</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome"
              placeholderTextColor="#B0BEC5"
              value={name}
              onChangeText={setName}
            />
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
              autoCapitalize="none"
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
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#4FC3F7" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              placeholderTextColor="#B0BEC5"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backToLogin} onPress={() => router.push('/')}>
            <Text style={styles.linkText}>Voltar para Login</Text>
          </TouchableOpacity>
        </ScrollView>
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
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
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
  backToLogin: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

