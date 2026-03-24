import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../page/ProductListScreen';
import ProductDetailScreen from '../page/ProductDetailScreen';
import ProductFormScreen from '../page/ProductFormScreen';
import { Producto } from '../models/Producto';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { producto: Producto };
  ProductForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: 'Productos' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Detalle del producto' }}
        />
        <Stack.Screen
          name="ProductForm"
          component={ProductFormScreen}
          options={{ title: 'Nuevo producto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}