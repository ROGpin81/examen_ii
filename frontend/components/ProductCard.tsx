import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Producto } from '../models/Producto';

interface Props {
  producto: Producto;
  onDetalle: () => void;
  onEliminar: () => void;
}

export default function ProductCard({ producto, onDetalle, onEliminar }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text>Categoría: {producto.categoria}</Text>
      <Text>Estado: {producto.estado}</Text>
      <Text>Precio: L. {producto.precio}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.detalleBtn} onPress={onDetalle}>
          <Text style={styles.btnText}>Detalle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eliminarBtn} onPress={onEliminar}>
          <Text style={styles.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  detalleBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  eliminarBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});