import { RouteProp, useRoute } from '@react-navigation/native';
import { Text, Image, View } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
import ScreenContainer from '../components/ScreenContainer';
import { commonStyles } from '../styles/commonStyles';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const { producto } = route.params;

  return (
    <ScreenContainer scrollable>
      {producto.url_fotografia ? (
        <Image source={{ uri: producto.url_fotografia }} style={commonStyles.image} />
      ) : (
        <View style={commonStyles.imagePlaceholder}>
          <Text>Sin fotografía</Text>
        </View>
      )}

      <Text style={commonStyles.title}>{producto.nombre}</Text>
      <Text style={commonStyles.detailText}>Descripción: {producto.descripcion}</Text>
      <Text style={commonStyles.detailText}>Precio: L. {producto.precio}</Text>
      <Text style={commonStyles.detailText}>Estado: {producto.estado}</Text>
      <Text style={commonStyles.detailText}>Categoría: {producto.categoria}</Text>
    </ScreenContainer>
  );
}