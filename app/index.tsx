import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Product } from "@/types/product";
import RNPickerSelect from "react-native-picker-select";

const ProductListView = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sizeFilter, setSizeFilter] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const productsData: Product[] = require("../products.json");
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    if (sizeFilter) {
      const filtered = products.filter((product) =>
        product.sizes.some((size) => size.name === sizeFilter)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, sizeFilter]);

  const resetFilters = () => {
    setSizeFilter("");
  };

  const RenderProduct = React.memo(({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() =>
        router.push({
          pathname: `[id]`,
          params: { id: item.productId, name: item.name },
        })
      }
    >
      <Image source={{ uri: item.mainImageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{`$${(item.price / 100).toFixed(
        2
      )}`}</Text>
    </TouchableOpacity>
  ));

  const sizeItems = useMemo(() => {
    return Array.from(
      new Set(
        products.flatMap((product) =>
          product.sizes.map((size: { name: string }) => size.name)
        )
      )
    ).map((size) => ({ label: size, value: size }));
  }, [products]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.pickerLabel}>Size:</Text>
        <View style={styles.pickerContainer}>
        <RNPickerSelect
            onValueChange={(value) => setSizeFilter(value)}
            items={sizeItems}
            placeholder={{ label: "Select a size", value: null }}
            value={sizeFilter}
            style={pickerSelectStyles}
          />
        </View>
        {sizeFilter && (
          <TouchableOpacity onPress={resetFilters} style={styles.button}>
            <Text style={styles.buttonText}>Reset Filters</Text>
          </TouchableOpacity>
        )}
      </View>
      {sizeFilter && (
        <View style={styles.selectedFiltersContainer}>
          <Text style={styles.selectedFiltersText}>
            Size: {sizeFilter}
          </Text>
        </View>
      )}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <RenderProduct item={item} />}
        keyExtractor={(item) => item.productId}
        numColumns={3}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 50, 
  },
  picker: {
    flex: 1,
    width: "100%",
    height: 50,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  productList: {
    flexGrow: 1,
  },
  productContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  selectedFiltersContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  selectedFiltersText: {
    fontSize: 14,
    color: "#555",
  },
});


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, 
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, 
  },
});

export default ProductListView;
