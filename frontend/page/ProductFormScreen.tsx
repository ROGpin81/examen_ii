import { useEffect, useState } from 'react';
import {
  Text,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../context/ProductContext';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import FormField from '../components/FormField';
import ImagePickerSection from '../components/ImagePickerSection';
import { commonStyles } from '../styles/commonStyles';

export default function ProductFormScreen() {
  const {
    agregarProducto,
    fotoTemporalUri,
    setFotoTemporalUri,
    limpiarFotoTemporal,
  } = useProducts();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState<'Disponible' | 'No disponible'>('Disponible');
  const [categoria, setCategoria] = useState('');
  const [urlFotografia, setUrlFotografia] = useState('');

  useEffect(() => {
    if (fotoTemporalUri) {
      setUrlFotografia(fotoTemporalUri);
    }
  }, [fotoTemporalUri]);

  const tomarFoto = async () => {
    try {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

      if (!cameraPermission.granted) {
        Alert.alert('Permiso requerido', 'Debes conceder permiso para usar la cámara.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setFotoTemporalUri(uri);
        setUrlFotografia(uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo abrir la cámara.');
    }
  };

  const seleccionarDesdeGaleria = async () => {
    try {
      const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!mediaPermission.granted) {
        Alert.alert('Permiso requerido', 'Debes conceder permiso para acceder a la galería.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setFotoTemporalUri(uri);
        setUrlFotografia(uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo abrir la galería.');
    }
  };

  const quitarFoto = () => {
    setUrlFotografia('');
    limpiarFotoTemporal();
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setEstado('Disponible');
    setCategoria('');
    setUrlFotografia('');
    limpiarFotoTemporal();
  };

  const guardarProducto = async () => {
    if (!nombre || !descripcion || !precio || !estado || !categoria) {
      Alert.alert('Validación', 'Complete todos los campos obligatorios');
      return;
    }

    if (Number.isNaN(Number(precio))) {
      Alert.alert('Validación', 'El precio debe ser numérico');
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
      limpiarFormulario();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear el producto');
    }
  };

  return (
    <ScreenContainer scrollable>
      <Text style={commonStyles.title}>Formulario de producto</Text>

      <FormField
        label="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese el nombre del producto"
      />

      <FormField
        label="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ingrese la descripción"
        multiline
      />

      <FormField
        label="Precio"
        value={precio}
        onChangeText={setPrecio}
        placeholder="Ingrese el precio"
        keyboardType="numeric"
      />

      <FormField
        label="Estado"
        value={estado}
        onChangeText={(text) => setEstado(text as 'Disponible' | 'No disponible')}
        placeholder="Disponible o No disponible"
      />

      <FormField
        label="Categoría"
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Ingrese la categoría"
      />

      <ImagePickerSection
        imageUri={urlFotografia}
        onTakePhoto={tomarFoto}
        onPickFromGallery={seleccionarDesdeGaleria}
        onRemovePhoto={quitarFoto}
      />

      <FormField
        label="URI de la foto"
        value={urlFotografia}
        onChangeText={setUrlFotografia}
        placeholder="La URI se llenará automáticamente"
      />

      <PrimaryButton title="Guardar producto" onPress={guardarProducto} />
    </ScreenContainer>
  );
}