import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import Toast from 'react-native-toast-message';
import { NavBar } from '../components/navBar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home() {
  const { usuario } = useUsuarioStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLogout = () => {
    router.replace('/');
  };

  useEffect(() => {
    Toast.show({
      type: 'success',
      text1: 'Bem vindo!',
      text2: 'Aproveite 😉',
      visibilityTime: 5000
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

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

  const handleBuyNow = () => {
    router.push('/produtos');
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
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
            <Ionicons name="menu" size={30} color="#4FC3F7" />
          </TouchableOpacity>

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
          
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <View style={styles.heroContainer}>
              <Image
                source={require('../assets/imagens/hh.png')}
                style={styles.heroImage}
              />
              <View style={styles.heroTextContainer}>
                <Text style={styles.heroTitle}></Text>
                <Text style={styles.heroSubtitle}>Hidratação Inteligente</Text>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="water-outline" size={32} color="#4FC3F7" />
                <Text style={styles.featureText}>Monitoramento em Tempo Real</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="bluetooth-outline" size={32} color="#4FC3F7" />
                <Text style={styles.featureText}>Conexão Bluetooth</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="calendar-outline" size={32} color="#4FC3F7" />
                <Text style={styles.featureText}>Acompanhamento Diário</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="phone-portrait-outline" size={32} color="#4FC3F7" />
                <Text style={styles.featureText}>App Integrado</Text>
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                💧 Mantenha-se hidratado de forma inteligente! Apresentamos a nova Garrafa HydraTech 🚰✨ Com um painel digital que monitora sua ingestão de água em tempo real e conexão via Bluetooth, você acompanha facilmente quantos litros bebeu no dia, semana e mês diretamente no seu celular. Ideal para quem quer cuidar da saúde e atingir metas de hidratação de forma prática e moderna! 📲💙
              </Text>
            </View>
            <TouchableOpacity style={styles.ctaButton} onPress={handleBuyNow}>
              <Text style={styles.ctaButtonText}>Compre Agora</Text>
            </TouchableOpacity>
          </Animated.View>
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  hamburgerButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
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
  contentContainer: {
    padding: 20,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  heroImage: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  heroTextContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#4FC3F7',
    marginTop: 5,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  description: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});