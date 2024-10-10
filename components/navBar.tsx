import { Link } from 'expo-router';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface NavBarProps {
}

export function NavBar (props: NavBarProps) {
    return (
        <View style={styles.navbar}>
            <Link href="/home" style={styles.navButton}>
                <Text style={styles.navText}>Página Inicial</Text>
            </Link>
        <Link href="/produtos" style={styles.navButton}>
          <Text style={styles.navText}>Produtos</Text>
        </Link>
      </View>
    );
}
const styles = StyleSheet.create({
    
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 15,
      backgroundColor: '#007BFF',
      borderRadius: 15,
    },
    navButton: {
      padding: 10,
    },
    navText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  