import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import { NavBar } from '../components/navBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const productWidth = (width - 60) / 2;

export default function Produtos() {
  const router = useRouter();
  const { usuario } = useUsuarioStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleProfile = () => {
    router.push('/perfil');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    router.replace('/');
    setIsMenuOpen(false);
  };

  const handleHomeReturn = () => {
    router.push('/home');
  };

  const products = [
    { name: 'Garrafa Branca', price: 'R$ 749,90', image: require('../assets/imagens/branca.png'), description: 'Garrafa de água reutilizável com capacidade de 500ml. Ideal para uso diário e sustentável.' },
    { name: 'Garrafa Azul', price: 'R$ 849,90', image: require('../assets/imagens/azul.png'), description: 'Garrafa de água reutilizável com capacidade de 750ml. Ideal para manter a hidratação por mais tempo.' },
    { name: 'Garrafa Preta', price: 'R$ 649,90', image: require('../assets/imagens/preta.png'), description: 'Garrafa de água com sensor de temperatura e capacidade de 600ml. Ideal para bebidas quentes e frias.' },
    { name: 'Garrafa Rosa', price: 'R$ 949,90', image: require('../assets/imagens/rosa.png'), description: 'Garrafa de água inteligente com capacidade de 1L e sistema de autolimpeza. Perfeita para uso prolongado.' },
    { name: 'Garrafa Vermelha', price: 'R$ 949,90', image: require('../assets/imagens/vermelha.png'), description: 'Garrafa de água inteligente com capacidade de 1L e sistema de autolimpeza. Perfeita para uso prolongado.' },
  ];

  return (
    <ImageBackground
      source={require('../assets/imagens/background.png')}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Ionicons name="menu" size={30} color="#4FC3F7" />
          </TouchableOpacity>
          <Text style={styles.title}>Produtos</Text>
          <TouchableOpacity onPress={handleHomeReturn} style={styles.homeButton}>
            <Ionicons name="home" size={30} color="#4FC3F7" />
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.backgroundOverlay} onPress={closeMenu} activeOpacity={1} />
            <View style={styles.menu}>
              <TouchableOpacity onPress={handleProfile} style={styles.menuItem}>
                <Ionicons name="person-outline" size={24} color="#4FC3F7" />
                <Text style={styles.menuItemText}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Ionicons name="log-out-outline" size={24} color="#4FC3F7" />
                <Text style={styles.menuItemText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.productsGrid}>
            {products.map((product, index) => (
              <View key={index} style={styles.productContainer}>
                <Image
                  source={product.image}
                  style={styles.productImage}
                  accessibilityLabel={`Imagem da ${product.name}`}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Ionicons name="cart-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.buyButtonText}>Comprar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  menuButton: {
    zIndex: 10,
  },
  homeButton: {
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 250,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  scrollViewContent: {
    padding: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: productWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: productWidth - 30,
    height: productWidth - 30,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#4FC3F7',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#4FC3F7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonIcon: {
    marginRight: 5,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});