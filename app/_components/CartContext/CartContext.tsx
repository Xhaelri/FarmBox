"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// CartItem ID is already number, matching the new Product ID type
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type AddToCartItem = Pick<CartItem, 'id' | 'name' | 'price' | 'image'>;

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: AddToCartItem, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getItemQuantity: (id: number) => number;
  isInCart: (id: number) => boolean;
  getCartTotal: () => number;
  clearCart: () => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          // Validation for number ID
          if (Array.isArray(parsedCart) && parsedCart.every(item => typeof item.id === 'number' && typeof item.quantity === 'number')) {
             setCart(parsedCart);
          } else {
            console.warn("Invalid cart data (expected number IDs). Clearing.");
            localStorage.removeItem("cart");
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
          localStorage.removeItem("cart");
        }
      }
      setIsInitialLoad(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes (after initial load)
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialLoad) {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cart");
      }
    }
  }, [cart, isInitialLoad]);

  // --- Cart Operations ---
  function isInCart(id: number): boolean {
    return cart.some((item) => item.id === id);
  }

  function getItemQuantity(id: number): number {
    const item = cart.find((item) => item.id === id);
    return item ? item.quantity : 0;
  }

  function addToCart(item: AddToCartItem, quantity: number): void {
    if (quantity <= 0) return;
    
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  }

  function removeFromCart(id: number): void {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function updateQuantity(id: number, quantity: number): void {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function getCartTotal(): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function getCartItemCount(): number {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  function clearCart(): void {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    isInCart,
    getCartTotal,
    clearCart,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}