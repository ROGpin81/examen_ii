import { useCallback } from 'react';
import {
  Text,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductCard from '../components/ProductCard';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useProducts } from '../context/ProductContext';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { commonStyles } from '../styles/commonStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

export default function ProductListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { productos, cargando, cargarProductos, borrarProducto } = useProducts();

  const confirmarEliminar = (id: number) => {
    Alert.alert('Confirmación', '¿Desea eliminar este producto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await borrarProducto(id);
          } catch (error: any) {
            Alert.alert('Error', error.message || 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  return (
    <ScreenContainer>
      <PrimaryButton
        title="Agregar producto"
        color="#16a34a"
        onPress={() => navigation.navigate('ProductForm')}
      />

      {cargando ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              producto={item}
              onDetalle={() => navigation.navigate('ProductDetail', { producto: item })}
              onEliminar={() => confirmarEliminar(item.id)}
            />
          )}
          ListEmptyComponent={
            <Text style={commonStyles.emptyText}>No hay productos registrados.</Text>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
});