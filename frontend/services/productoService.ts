import { API_BASE_URL } from './api';
import { Producto } from '../models/Producto';

export async function obtenerProductos(): Promise<Producto[]> {
  const response = await fetch(`${API_BASE_URL}/productos`);
  if (!response.ok) {
    throw new Error('Error al obtener productos');
  }
  return response.json();
}

export async function crearProducto(producto: Omit<Producto, 'id'>) {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear producto');
  }

  return response.json();
}

export async function eliminarProducto(id: number) {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar producto');
  }

  return response.json();
}