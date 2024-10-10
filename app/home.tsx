import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { NavBar } from '../components/navBar';

export default function Home() {
  const { usuario } = useUsuarioStore();
  const router = useRouter();
  const handleLogout = () => {
    router.replace('/'); 
  };

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Logado',
      text2: 'Aproveite 😉',
      visibilityTime: 5000
    });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bem vindo, {usuario}!</Text>
      </View>
      <TouchableOpacity style={{padding:10}} onPress={handleLogout}>
        <Text style={styles.title}>Sair</Text>
      </TouchableOpacity>
      <NavBar/>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>HydraTech</Text>
        <Text style={styles.description}>
          💧 Mantenha-se hidratado de forma inteligente! Apresentamos a nova Garrafa HydraTech 🚰✨ Com um painel digital que monitora sua ingestão de água em tempo real e conexão via Bluetooth, você acompanha facilmente quantos litros bebeu no dia, semana e mês diretamente no seu celular. Ideal para quem quer cuidar da saúde e atingir metas de hidratação de forma prática e moderna! 📲💙
        </Text>
      </View>
      <Image
        source={require('../assets/imagens/h.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  descriptionContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  description: {
    fontSize: 13,
    textAlign: 'center',
    color: 'black',
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 1,
    color: '#333',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    backgroundColor: 'lightgray',
    width: 300,
    borderRadius: 15,
    alignSelf: 'center',
  },
  image: {
    width: 400,
    height: 450,
    alignSelf: 'center',
  },
});
