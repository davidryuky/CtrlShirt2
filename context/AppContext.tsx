
import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode } from 'react';
import { User, CartItem, UserRole } from '../types';
import { mockApi } from '../services/mockApi';

interface AppContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('ctrlshirt_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('ctrlshirt_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('ctrlshirt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ctrlshirt_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ctrlshirt_cart', JSON.stringify(cart));
  }, [cart]);

  const login = useCallback(async (email: string, pass: string): Promise<User | null> => {
    // This is a mock login. In a real app, you'd fetch all users and check credentials.
    // For this mock, we just check against the hardcoded initial users.
    const users = await mockApi.getUsers(); // This mock doesn't include passwords
    
    // Simulate check
    let foundUser: User | null = null;
    if (email === 'admin@ctrlshirt.com' && pass === 'admin') {
        foundUser = {id: '1', name: 'Admin User', email: 'admin@ctrlshirt.com', role: UserRole.ADMIN};
    } else if (email === 'manager@ctrlshirt.com' && pass === 'manager') {
        foundUser = {id: '2', name: 'Manager User', email: 'manager@ctrlshirt.com', role: UserRole.MANAGER};
    } else if (email === 'customer@test.com' && pass === 'password') {
        foundUser = {id: '3', name: 'Customer Test', email: 'customer@test.com', role: UserRole.CUSTOMER};
    }

    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addToCart = useCallback((newItem: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.productId === newItem.productId && item.size === newItem.size
      );
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === newItem.productId && item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevCart, newItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.productId === productId && item.size === size)));
  }, []);

  const updateCartQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    user,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartCount,
    cartTotal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
