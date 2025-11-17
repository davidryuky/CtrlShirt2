import { Product, Category, Order, User, Coupon, UserRole, OrderStatus, ProductSize, Review, Settings } from '../types';

const initialCategories: Category[] = [
  { id: '1', name: 'Games Retrô', slug: 'games-retro' },
  { id: '2', name: 'Sci-Fi', slug: 'sci-fi' },
  { id: '3', name: 'Anime & Mangá', slug: 'anime-manga' },
  { id: '4', name: 'Código & Tech', slug: 'codigo-tech' },
  { id: '5', name: 'Humor Nerd', slug: 'humor-nerd' },
];

const generateSizes = (): ProductSize[] => {
  const sizes: ('P' | 'M' | 'G' | 'GG' | 'XG')[] = ['P', 'M', 'G', 'GG', 'XG'];
  return sizes.map(s => ({ size: s, stock: Math.floor(Math.random() * 50) }));
};

const generateReviews = (productId: string): Review[] => {
  const reviewCount = Math.floor(Math.random() * 5) + 1;
  const reviews: Review[] = [];
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      id: `${productId}-review-${i}`,
      author: `User${Math.floor(Math.random() * 1000)}`,
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
      comment: 'Ótima camiseta, tecido de alta qualidade e estampa perfeita!',
      date: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    });
  }
  return reviews;
};

const initialProducts: Product[] = [
  { id: '1', name: 'Pixel Invader', slug: 'pixel-invader', description: 'Uma camiseta clássica para os amantes de 8-bit.', price: 79.90, categoryId: '1', images: ['https://picsum.photos/seed/p1/800/800', 'https://picsum.photos/seed/p1-2/800/800'], sizes: generateSizes(), reviews: generateReviews('1'), tags: ['8-bit', 'retro'] },
  { id: '2', name: 'Console Wars Veteran', slug: 'console-wars-veteran', description: 'Mostre de que lado você estava.', price: 89.90, categoryId: '1', images: ['https://picsum.photos/seed/p2/800/800'], sizes: generateSizes(), reviews: generateReviews('2'), tags: ['console', 'retro'] },
  { id: '3', name: 'Galactic Empire Recruit', slug: 'galactic-empire-recruit', description: 'Junte-se ao lado sombrio, nós temos cookies.', price: 84.90, categoryId: '2', images: ['https://picsum.photos/seed/p3/800/800'], sizes: generateSizes(), reviews: generateReviews('3'), tags: ['sci-fi', 'space'] },
  { id: '4', name: 'Tardis Blueprint', slug: 'tardis-blueprint', description: 'Maior por dentro.', price: 79.90, categoryId: '2', images: ['https://picsum.photos/seed/p4/800/800'], sizes: generateSizes(), reviews: generateReviews('4'), tags: ['sci-fi', 'doctor'] },
  { id: '5', name: 'Shonen Power Level', slug: 'shonen-power-level', description: 'É mais de 9000!', price: 99.90, categoryId: '3', images: ['https://picsum.photos/seed/p5/800/800'], sizes: generateSizes(), reviews: generateReviews('5'), tags: ['anime', 'shonen'] },
  { id: '6', name: 'Ramen Ichiraku', slug: 'ramen-ichiraku', description: 'O melhor ramen de Konoha.', price: 79.90, categoryId: '3', images: ['https://picsum.photos/seed/p6/800/800'], sizes: generateSizes(), reviews: generateReviews('6'), tags: ['anime', 'naruto'] },
  { id: '7', name: 'Hello, World!', slug: 'hello-world', description: 'O primeiro passo de todo dev.', price: 74.90, categoryId: '4', images: ['https://picsum.photos/seed/p7/800/800'], sizes: generateSizes(), reviews: generateReviews('7'), tags: ['code', 'dev'] },
  { id: '8', name: 'Git Commit', slug: 'git-commit', description: 'git commit -m "Nova camiseta estilosa"', price: 84.90, categoryId: '4', images: ['https://picsum.photos/seed/p8/800/800'], sizes: generateSizes(), reviews: generateReviews('8'), tags: ['code', 'git'] },
  { id: '9', name: 'It\'s a feature', slug: 'its-a-feature', description: 'Não é um bug, é uma feature.', price: 79.90, categoryId: '5', images: ['https://picsum.photos/seed/p9/800/800'], sizes: generateSizes(), reviews: generateReviews('9'), tags: ['humor', 'dev'] },
  { id: '10', name: 'D20 Critical Hit', slug: 'd20-critical-hit', description: 'Para os mestres de RPG.', price: 89.90, categoryId: '5', images: ['https://picsum.photos/seed/p10/800/800'], sizes: generateSizes(), reviews: generateReviews('10'), tags: ['rpg', 'dnd'] },
];

const initialUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@ctrlshirt.com', password: 'admin', role: UserRole.ADMIN },
  { id: '2', name: 'Manager User', email: 'manager@ctrlshirt.com', password: 'manager', role: UserRole.MANAGER },
  { id: '3', name: 'Customer Test', email: 'customer@test.com', password: 'password', role: UserRole.CUSTOMER },
];

const initialOrders: Order[] = [
  { id: '1', userId: '3', items: [{...initialProducts[0], image: initialProducts[0].images[0], productId: '1', size: 'M', quantity: 1, id: 'item-1'}], subtotal: 79.90, shipping: 15.00, total: 94.90, status: OrderStatus.DELIVERED, shippingAddress: { fullName: 'Customer Test', address: '123 Test St', city: 'Testville', postalCode: '12345-678', country: 'Brasil' }, createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '2', userId: '3', items: [{...initialProducts[2], image: initialProducts[2].images[0], productId: '3', size: 'G', quantity: 2, id: 'item-2'}], subtotal: 169.80, shipping: 18.00, total: 187.80, status: OrderStatus.SHIPPED, shippingAddress: { fullName: 'Customer Test', address: '123 Test St', city: 'Testville', postalCode: '12345-678', country: 'Brasil' }, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
];

const initialCoupons: Coupon[] = [
    { id: '1', code: 'GEEK10', discountPercentage: 10, isActive: true },
    { id: '2', code: 'CTRL20', discountPercentage: 20, isActive: true },
    { id: '3', code: 'EXPIRED', discountPercentage: 50, isActive: false },
]

const initialSettings: Settings = {
    storeName: 'CtrlShirt',
    storeDescription: 'A complete online store for geek and nerd style t-shirts. Discover unique designs inspired by games, anime, technology, and pop culture. Find your next favorite loot!',
    contactEmail: 'contato@ctrlshirt.com',
    shippingCost: 15.00,
};

const SIMULATED_LATENCY = 500;

function getFromStorage<T>(key: string, initialData: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialData;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return initialData;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
}

// Initialize storage
if (!localStorage.getItem('ctrlshirt_products')) {
    saveToStorage('ctrlshirt_products', initialProducts);
}
if (!localStorage.getItem('ctrlshirt_categories')) {
    saveToStorage('ctrlshirt_categories', initialCategories);
}
if (!localStorage.getItem('ctrlshirt_users')) {
    saveToStorage('ctrlshirt_users', initialUsers);
}
if (!localStorage.getItem('ctrlshirt_orders')) {
    saveToStorage('ctrlshirt_orders', initialOrders);
}
if (!localStorage.getItem('ctrlshirt_coupons')) {
    saveToStorage('ctrlshirt_coupons', initialCoupons);
}
if (!localStorage.getItem('ctrlshirt_settings')) {
    saveToStorage('ctrlshirt_settings', initialSettings);
}

export const mockApi = {
    // Products
    getProducts: async (): Promise<Product[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getFromStorage('ctrlshirt_products', initialProducts));
            }, SIMULATED_LATENCY);
        });
    },
    getProductBySlug: async (slug: string): Promise<Product | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const products = getFromStorage('ctrlshirt_products', initialProducts);
                resolve(products.find(p => p.slug === slug));
            }, SIMULATED_LATENCY);
        });
    },
    updateProduct: async (productData: Product): Promise<Product> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let products = getFromStorage('ctrlshirt_products', initialProducts);
                const index = products.findIndex(p => p.id === productData.id);
                if (index !== -1) {
                    products[index] = productData;
                    saveToStorage('ctrlshirt_products', products);
                    resolve(productData);
                } else {
                    reject(new Error('Product not found'));
                }
            }, SIMULATED_LATENCY);
        });
    },
    createProduct: async (productData: Omit<Product, 'id' | 'slug' | 'reviews'>): Promise<Product> => {
         return new Promise(resolve => {
            setTimeout(() => {
                let products = getFromStorage('ctrlshirt_products', initialProducts);
                const newProduct: Product = {
                    ...productData,
                    id: String(Date.now()),
                    slug: productData.name.toLowerCase().replace(/\s+/g, '-'),
                    reviews: []
                };
                products.push(newProduct);
                saveToStorage('ctrlshirt_products', products);
                resolve(newProduct);
            }, SIMULATED_LATENCY);
        });
    },
    deleteProduct: async (productId: string): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let products = getFromStorage('ctrlshirt_products', initialProducts);
                products = products.filter(p => p.id !== productId);
                saveToStorage('ctrlshirt_products', products);
                resolve();
            }, SIMULATED_LATENCY);
        });
    },

    // Categories
    getCategories: async (): Promise<Category[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getFromStorage('ctrlshirt_categories', initialCategories));
            }, SIMULATED_LATENCY);
        });
    },
    createCategory: async (categoryData: Omit<Category, 'id' | 'slug'>): Promise<Category> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let categories = getFromStorage('ctrlshirt_categories', initialCategories);
                const newCategory: Category = {
                    ...categoryData,
                    id: String(Date.now()),
                    slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
                };
                categories.push(newCategory);
                saveToStorage('ctrlshirt_categories', categories);
                resolve(newCategory);
            }, SIMULATED_LATENCY);
        });
    },
    updateCategory: async (categoryData: Category): Promise<Category> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let categories = getFromStorage('ctrlshirt_categories', initialCategories);
                const index = categories.findIndex(c => c.id === categoryData.id);
                if (index !== -1) {
                    categories[index] = {
                        ...categoryData,
                        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-')
                    };
                    saveToStorage('ctrlshirt_categories', categories);
                    resolve(categories[index]);
                } else {
                    reject(new Error('Category not found'));
                }
            }, SIMULATED_LATENCY);
        });
    },
    deleteCategory: async (categoryId: string): Promise<void> => {
         return new Promise(resolve => {
            setTimeout(() => {
                let categories = getFromStorage('ctrlshirt_categories', initialCategories);
                categories = categories.filter(c => c.id !== categoryId);
                saveToStorage('ctrlshirt_categories', categories);
                resolve();
            }, SIMULATED_LATENCY);
        });
    },

    // Orders
    getOrders: async (): Promise<Order[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getFromStorage('ctrlshirt_orders', initialOrders));
            }, SIMULATED_LATENCY);
        });
    },
    getOrderById: async (id: string): Promise<Order | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orders = getFromStorage('ctrlshirt_orders', initialOrders);
                resolve(orders.find(o => o.id === id));
            }, SIMULATED_LATENCY);
        });
    },
    createOrder: async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let orders = getFromStorage('ctrlshirt_orders', initialOrders);
                const newOrder: Order = {
                    ...orderData,
                    id: String(Date.now()),
                    createdAt: new Date().toISOString()
                };
                orders.push(newOrder);
                saveToStorage('ctrlshirt_orders', orders);
                resolve(newOrder);
            }, SIMULATED_LATENCY);
        });
    },
    updateOrder: async (orderData: Order): Promise<Order> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let orders = getFromStorage('ctrlshirt_orders', initialOrders);
                const index = orders.findIndex(o => o.id === orderData.id);
                if (index !== -1) {
                    orders[index] = orderData;
                    saveToStorage('ctrlshirt_orders', orders);
                    resolve(orderData);
                } else {
                    reject(new Error('Order not found'));
                }
            }, SIMULATED_LATENCY);
        });
    },

    // Users
    getUsers: async (): Promise<User[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = getFromStorage<User[]>('ctrlshirt_users', initialUsers);
                // Omit password
                resolve(users.map(({password, ...user}) => user));
            }, SIMULATED_LATENCY);
        });
    },
    getUserById: async (id: string): Promise<User | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const users = getFromStorage<User[]>('ctrlshirt_users', initialUsers);
                const user = users.find(u => u.id === id);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    resolve(userWithoutPassword);
                } else {
                    resolve(undefined);
                }
            }, SIMULATED_LATENCY);
        });
    },

    // Coupons
    getCoupons: async (): Promise<Coupon[]> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getFromStorage('ctrlshirt_coupons', initialCoupons));
            }, SIMULATED_LATENCY);
        });
    },
    createCoupon: async (couponData: Omit<Coupon, 'id'>): Promise<Coupon> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let coupons = getFromStorage('ctrlshirt_coupons', initialCoupons);
                const newCoupon: Coupon = { ...couponData, id: String(Date.now()) };
                coupons.push(newCoupon);
                saveToStorage('ctrlshirt_coupons', coupons);
                resolve(newCoupon);
            }, SIMULATED_LATENCY);
        });
    },
    updateCoupon: async (couponData: Coupon): Promise<Coupon> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let coupons = getFromStorage('ctrlshirt_coupons', initialCoupons);
                const index = coupons.findIndex(c => c.id === couponData.id);
                if (index !== -1) {
                    coupons[index] = couponData;
                    saveToStorage('ctrlshirt_coupons', coupons);
                    resolve(couponData);
                } else {
                    reject(new Error('Coupon not found'));
                }
            }, SIMULATED_LATENCY);
        });
    },
    deleteCoupon: async (couponId: string): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(() => {
                let coupons = getFromStorage('ctrlshirt_coupons', initialCoupons);
                coupons = coupons.filter(c => c.id !== couponId);
                saveToStorage('ctrlshirt_coupons', coupons);
                resolve();
            }, SIMULATED_LATENCY);
        });
    },
    validateCoupon: async (code: string): Promise<Coupon | null> => {
         return new Promise(resolve => {
            setTimeout(() => {
                const coupons = getFromStorage('ctrlshirt_coupons', initialCoupons);
                const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
                resolve(coupon || null);
            }, SIMULATED_LATENCY);
        });
    },

    // Dashboard Stats
    getDashboardStats: async (): Promise<{totalRevenue: number, totalOrders: number, totalCustomers: number, newOrders: number}> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orders = getFromStorage('ctrlshirt_orders', initialOrders);
                const users = getFromStorage('ctrlshirt_users', initialUsers);

                const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
                const totalOrders = orders.length;
                const totalCustomers = users.filter(u => u.role === UserRole.CUSTOMER).length;
                const newOrders = orders.filter(o => new Date(o.createdAt) > new Date(Date.now() - 7 * 86400000)).length;

                resolve({ totalRevenue, totalOrders, totalCustomers, newOrders });
            }, SIMULATED_LATENCY);
        });
    },

    // Settings
    getSettings: async (): Promise<Settings> => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(getFromStorage('ctrlshirt_settings', initialSettings));
            }, SIMULATED_LATENCY);
        });
    },
    updateSettings: async (settingsData: Settings): Promise<Settings> => {
         return new Promise(resolve => {
            setTimeout(() => {
                saveToStorage('ctrlshirt_settings', settingsData);
                resolve(settingsData);
            }, SIMULATED_LATENCY);
        });
    },
};
