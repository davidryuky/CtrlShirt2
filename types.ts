

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductSize {
  size: 'P' | 'M' | 'G' | 'GG' | 'XG';
  stock: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  sizes: ProductSize[];
  reviews: Review[];
  tags: string[];
}

export enum UserRole {
  CUSTOMER = 'customer',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Not sent to client
  role: UserRole;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: 'P' | 'M' | 'G' | 'GG' | 'XG';
  quantity: number;
}

export interface OrderItem extends CartItem {
  id?: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export enum OrderStatus {
  PENDING = 'Pendente',
  PROCESSING = 'Processando',
  SHIPPED = 'Enviado',
  DELIVERED = 'Entregue',
  CANCELLED = 'Cancelado',
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  isActive: boolean;
}

export interface Settings {
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  shippingCost: number;
}
