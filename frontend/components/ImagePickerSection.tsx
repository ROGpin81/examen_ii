import { View, Text, Image } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { commonStyles } from '../styles/commonStyles';

interface ImagePickerSectionProps {
  imageUri: string;
  onTakePhoto: () => void;
  onPickFromGallery: () => void;
  onRemovePhoto: () => void;
}

export default function ImagePickerSection({
  imageUri,
  onTakePhoto,
  onPickFromGallery,
  onRemovePhoto,
}: ImagePickerSectionProps) {
  return (
    <>
      <Text style={commonStyles.label}>Fotografía</Text>

      {imageUri ? (
        <View>
          <Image source={{ uri: imageUri }} style={commonStyles.image} />

          <PrimaryButton
            title="Tomar foto con cámara"
            color="#2563eb"
            onPress={onTakePhoto}
          />

          <PrimaryButton
            title="Seleccionar desde galería"
            color="#7c3aed"
            onPress={onPickFromGallery}
          />

          <PrimaryButton
            title="Quitar foto"
            color="#dc2626"
            onPress={onRemovePhoto}
          />
        </View>
      ) : (
        <>
          <View style={commonStyles.imagePlaceholder}>
            <Text>Elija una opción para agregar la fotografía</Text>
          </View>

          <PrimaryButton
            title="Tomar foto con cámara"
            color="#2563eb"
            onPress={onTakePhoto}
          />

          <PrimaryButton
            title="Seleccionar desde galería"
            color="#7c3aed"
            onPress={onPickFromGallery}
          />
        </>
      )}
    </>
  );
}