import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './data/products';

// =====================================================
// CART STORE
// =====================================================
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, quantity = 1, color, size) => {
        set((state) => {
          const existingItem = state.items.find(
            item => item.product.id === product.id && 
            item.selectedColor === color && 
            item.selectedSize === size
          );
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id && 
                item.selectedColor === color && 
                item.selectedSize === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isOpen: true
            };
          }
          
          return {
            items: [...state.items, { product, quantity, selectedColor: color, selectedSize: size }],
            isOpen: true
          };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: quantity === 0
            ? state.items.filter(item => item.product.id !== productId)
            : state.items.map(item =>
                item.product.id === productId
                  ? { ...item, quantity }
                  : item
              )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    }),
    {
      name: 'omatrikaa-cart'
    }
  )
);

// =====================================================
// WISHLIST STORE
// =====================================================
interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          if (state.items.find(item => item.id === product.id)) {
            return state;
          }
          return { items: [...state.items, product] };
        });
      },
      
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },
      
      toggleItem: (product) => {
        const isInList = get().isInWishlist(product.id);
        if (isInList) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'omatrikaa-wishlist'
    }
  )
);

// =====================================================
// RECENTLY VIEWED STORE
// =====================================================
interface RecentlyViewedState {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          const filtered = state.items.filter(item => item.id !== product.id);
          return { items: [product, ...filtered].slice(0, 10) };
        });
      },
      
      clearItems: () => set({ items: [] })
    }),
    {
      name: 'omatrikaa-recently-viewed'
    }
  )
);

// =====================================================
// SEARCH STORE
// =====================================================
interface SearchState {
  isOpen: boolean;
  query: string;
  recentSearches: string[];
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      isOpen: false,
      query: '',
      recentSearches: [],
      
      openSearch: () => set({ isOpen: true }),
      closeSearch: () => set({ isOpen: false, query: '' }),
      setQuery: (query) => set({ query }),
      
      addRecentSearch: (query) => {
        if (!query.trim()) return;
        set((state) => {
          const filtered = state.recentSearches.filter(s => s !== query);
          return { recentSearches: [query, ...filtered].slice(0, 5) };
        });
      },
      
      clearRecentSearches: () => set({ recentSearches: [] })
    }),
    {
      name: 'omatrikaa-search'
    }
  )
);

// =====================================================
// UI STORE (Non-persisted)
// =====================================================
interface UIState {
  mobileMenuOpen: boolean;
  quickViewProduct: Product | null;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  quickViewProduct: null,
  
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null })
}));
