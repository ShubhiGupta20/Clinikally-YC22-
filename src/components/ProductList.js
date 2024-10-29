import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ProductList = ({ products, onSelectProduct }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.productItem} onPress={() => onSelectProduct(item)}>
          <Text style={styles.productName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  productItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  productName: { fontSize: 18 },
});

export default ProductList;
