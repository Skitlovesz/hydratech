import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import { NavBar } from '../components/navBar';

export default function Login() {
  const handleLogout = () => {
    router.replace('/');
  };

  const { usuario } = useUsuarioStore();
  return (
    
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bem vindo, {usuario}!</Text>
      </View>
      <TouchableOpacity style={{padding:10}} onPress={handleLogout}>
        <Text style={styles.title}>Sair</Text>
      </TouchableOpacity>
      <NavBar/>
      <ScrollView>
        <View style={styles.productContainer}>
          <Image
            source={require('../assets/imagens/branca.png')}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Garrafa Branca</Text>
          <Text style={styles.productPrice}>R$ 749,90</Text>
          <Text style={styles.productDescription}>
            Garrafa de água reutilizável com capacidade de 500ml. Ideal para uso diário e sustentável.
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar Agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          <Image 
            source={require('../assets/imagens/azul.png')}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Garrafa Azul</Text>
          <Text style={styles.productPrice}>R$ 849,90</Text>
          <Text style={styles.productDescription}>
            Garrafa de água reutilizável com capacidade de 750ml. Ideal para manter a hidratação por mais tempo.
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar Agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          <Image 
            source={require('../assets/imagens/preta.png')} 
            style={styles.productImage}
          />
          <Text style={styles.productName}>Garrafa Preta</Text>
          <Text style={styles.productPrice}>R$ 649,90</Text>
          <Text style={styles.productDescription}>
            Garrafa de água com sensor de temperatura e capacidade de 600ml. Ideal para bebidas quentes e frias.
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar Agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          <Image 
            source={require('../assets/imagens/rosa.png')}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Garrafa Rosa</Text>
          <Text style={styles.productPrice}>R$ 949,90</Text>
          <Text style={styles.productDescription}>
            Garrafa de água inteligente com capacidade de 1L e sistema de autolimpeza. Perfeita para uso prolongado.
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar Agora</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          <Image 
            source={require('../assets/imagens/vermelha.png')}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Garrafa Vermelha</Text>
          <Text style={styles.productPrice}>R$ 949,90</Text>
          <Text style={styles.productDescription}>
            Garrafa de água inteligente com capacidade de 1L e sistema de autolimpeza. Perfeita para uso prolongado.
          </Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar Agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center',
    marginVertical: 1,
    color: '#333',
    textShadowColor: '#aaa',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
    backgroundColor:'lightgray',
    width: 300,
    borderRadius: 15,
    alignSelf:'center'
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    color: '#888',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
