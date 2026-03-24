import StackNavigator from './navigation/StackNavigator';
import { ProductProvider } from './context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <StackNavigator />
    </ProductProvider>
  );
}