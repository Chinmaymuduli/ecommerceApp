import create from 'zustand';

import {devtools, persist} from 'zustand/middleware';

const productStore = (set: any) => ({
  products: [],
  wishlists: [],
  //Add Products
  addProducts: (product: any) => {
    set((state: {products: any}) => ({
      products: [product, ...state.products],
    }));
  },

  //remove products
  removeProducts: (productId: any) => {
    set((state: any) => ({
      products: state.products.filter((item: any) => item.id !== productId),
    }));
  },

  //add wishlist
  addWishlist: (wishlist: any) => {
    set((state: any) => ({
      wishlists: [wishlist, ...state.wishlists],
    }));
  },

  //remove wishlist
  removeWishlist: (wishlistId: any) => {
    set((state: any) => ({
      wishlists: state.wishlists.filter(
        (wishitem: any) => wishitem.id !== wishlistId,
      ),
    }));
  },
});

const useCourseStore = create(
  devtools(
    persist(productStore, {
      name: 'products',
    }),
  ),
);

export default useCourseStore;
