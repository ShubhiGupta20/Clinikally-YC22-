import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ProductList from '../components/ProductList';
import CountdownTimer from '../components/CountdownTimer';
import { parseCSV } from '../utils/csvUtils';
import { calculateDeliveryDate } from '../utils/dateUtils';
import productsData from '../../assets/product.csv';
import pincodesData from '../../assets/pincode.csv';

const ProductSelectionScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [cutoffTime, setCutoffTime] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const parsedProducts = await parseCSV(productsData);
      setProducts(parsedProducts);
    };
    loadProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCheckDelivery = () => {
    const result = calculateDeliveryDate(pincode, selectedProduct);
    setDeliveryDate(result.date);
    setCutoffTime(result.cutoffTime);
  };

  return (
    <View style={styles.container}>
      <ProductList products={products} onSelectProduct={handleSelectProduct} />
      {selectedProduct && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Pincode"
            value={pincode}
            onChangeText={setPincode}
          />
          <Button title="Check Delivery Date" onPress={handleCheckDelivery} />
          {deliveryDate && <Text>Estimated Delivery Date: {deliveryDate}</Text>}
          {cutoffTime && <CountdownTimer cutoffTime={cutoffTime} />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 16 },
});

export default ProductSelectionScreen;
