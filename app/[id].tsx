import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Product } from '@/types/product';
import products from '@/products.json';

const ProductDetailView = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.productId === id); 

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.mainImageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{`$${(product.price / 100).toFixed(2)}`}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      {product.materials && (
        <Text style={styles.productMaterials}>{`Materials: ${product.materials}`}</Text>
      )}
      {product.shippingInfo && (
        <Text style={styles.productShippingInfo}>{`Shipping Info: ${product.shippingInfo}`}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginTop: 5,
  },
  productDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  productMaterials: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  productShippingInfo: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
});

export default ProductDetailView;