import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Producto } from '../models/Producto';
import {
  obtenerProductos as obtenerProductosApi,
  crearProducto as crearProductoApi,
  eliminarProducto as eliminarProductoApi,
} from '../services/productoService';

interface CrearProductoInput {
  nombre: string;
  descripcion: string;
  precio: number;
  estado: 'Disponible' | 'No disponible';
  categoria: string;
  url_fotografia?: string | null;
}

interface ProductContextProps {
  productos: Producto[];
  cargando: boolean;
  fotoTemporalUri: string | null;
  cargarProductos: () => Promise<void>;
  agregarProducto: (producto: CrearProductoInput) => Promise<void>;
  borrarProducto: (id: number) => Promise<void>;
  setFotoTemporalUri: (uri: string | null) => void;
  limpiarFotoTemporal: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [fotoTemporalUri, setFotoTemporalUri] = useState<string | null>(null);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await obtenerProductosApi();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      throw error;
    } finally {
      setCargando(false);
    }
  };

  const agregarProducto = async (producto: CrearProductoInput) => {
    try {
      await crearProductoApi(producto);
      await cargarProductos();
      limpiarFotoTemporal();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      throw error;
    }
  };

  const borrarProducto = async (id: number) => {
    try {
      await eliminarProductoApi(id);
      setProductos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw error;
    }
  };

  const limpiarFotoTemporal = () => {
    setFotoTemporalUri(null);
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        cargando,
        fotoTemporalUri,
        cargarProductos,
        agregarProducto,
        borrarProducto,
        setFotoTemporalUri,
        limpiarFotoTemporal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProducts debe usarse dentro de ProductProvider');
  }

  return context;
}