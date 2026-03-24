import { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../context/ProductContext';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import { commonStyles } from '../styles/commonStyles';

export default function ProductFormScreen() {
  const navigation = useNavigation();
  const { agregarProducto } = useProducts();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState<'Disponible' | 'No disponible'>('Disponible');
  const [categoria, setCategoria] = useState('');
  const [urlFotografia, setUrlFotografia] = useState('');

  const guardarProducto = async () => {
    if (!nombre || !descripcion || !precio || !estado || !categoria) {
      Alert.alert('Validación', 'Complete todos los campos obligatorios');
      return;
    }

    try {
      await agregarProducto({
        nombre,
        descripcion,
        precio: Number(precio),
        estado,
        categoria,
        url_fotografia: urlFotografia || null,
      });

      Alert.alert('Éxito', 'Producto creado correctamente');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear el producto');
    }
  };

  return (
    <ScreenContainer scrollable>
      <Text style={commonStyles.title}>Formulario de producto</Text>

      <Text style={commonStyles.label}>Nombre</Text>
      <TextInput
        style={commonStyles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese el nombre del producto"
      />

      <Text style={commonStyles.label}>Descripción</Text>
      <TextInput
        style={[commonStyles.input, commonStyles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ingrese la descripción"
        multiline
      />

      <Text style={commonStyles.label}>Precio</Text>
      <TextInput
        style={commonStyles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Ingrese el precio"
        keyboardType="numeric"
      />

      <Text style={commonStyles.label}>Estado</Text>
      <TextInput
        style={commonStyles.input}
        value={estado}
        onChangeText={(text) => setEstado(text as 'Disponible' | 'No disponible')}
        placeholder="Disponible o No disponible"
      />

      <Text style={commonStyles.label}>Categoría</Text>
      <TextInput
        style={commonStyles.input}
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Ingrese la categoría"
      />

      <Text style={commonStyles.label}>URL fotografía</Text>
      <TextInput
        style={commonStyles.input}
        value={urlFotografia}
        onChangeText={setUrlFotografia}
        placeholder="Ingrese la URL o ruta de la foto"
      />

      <PrimaryButton title="Guardar producto" onPress={guardarProducto} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({});