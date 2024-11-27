import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Dimensions, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsuarioStore } from "../store/usuario-store";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');
const productWidth = (width - 60) / 2;

type Product = {
  name: string;
  price: string;
  image: any;
  description: string;
};

export default function Produtos() {
  const router = useRouter();
  const { usuario } = useUsuarioStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [cpf, setCpf] = useState('');
  const [errors, setErrors] = useState({
    address: '',
    number: '',
    complement: '',
    cpf: '',
  });

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

  const handleBuyClick = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handlePurchase = () => {
    const newErrors = {
      address: address ? '' : 'Endereço é obrigatório',
      number: number ? '' : 'Número é obrigatório',
      complement: complement ? '' : 'Complemento é obrigatório',
      cpf: cpf ? '' : 'CPF é obrigatório',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    console.log('Purchase completed', { selectedProduct, address, number, complement, cpf });
    setModalVisible(false);
    setAddress('');
    setNumber('');
    setComplement('');
    setCpf('');
    setErrors({
      address: '',
      number: '',
      complement: '',
      cpf: '',
    });
  };

  const products: Product[] = [
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
                <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyClick(product)}>
                  <Ionicons name="cart-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.buyButtonText}>Comprar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#4FC3F7" />
              </TouchableOpacity>
              {selectedProduct && (
                <>
                  <Image source={selectedProduct.image} style={styles.modalImage} />
                  <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                  <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>
                </>
              )}
              <TextInput
                style={[styles.input, errors.address ? styles.inputError : null]}
                placeholder="Endereço"
                value={address}
                onChangeText={setAddress}
              />
              {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
              <TextInput
                style={[styles.input, errors.number ? styles.inputError : null]}
                placeholder="Número"
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
              />
              {errors.number ? <Text style={styles.errorText}>{errors.number}</Text> : null}
              <TextInput
                style={[styles.input, errors.complement ? styles.inputError : null]}
                placeholder="Complemento"
                value={complement}
                onChangeText={setComplement}
              />
              {errors.complement ? <Text style={styles.errorText}>{errors.complement}</Text> : null}
              <TextInput
                style={[styles.input, errors.cpf ? styles.inputError : null]}
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
              />
              {errors.cpf ? <Text style={styles.errorText}>{errors.cpf}</Text> : null}
              <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
                <Text style={styles.purchaseButtonText}>Finalizar Compra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalProductPrice: {
    fontSize: 16,
    color: '#4FC3F7',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#4FC3F7',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  purchaseButton: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});