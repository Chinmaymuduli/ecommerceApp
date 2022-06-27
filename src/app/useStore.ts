import { AYUSH, AYUSH_1, AYUSH_2, AYUSH_3, AYUSH_4, AYUSH_5, GFOOD, GOURMEET1, GOURMEET2, GOURMEET3, GOURMEET4, GOURMEET5, HOMECARE, PCARE, PERSONAL1, PERSONAL2, PERSONAL3, PERSONAL4, PERSONAL5, SWEET1, SWEET2, SWEETS } from 'assets'
// import { b_1, b_2, b_3, b_4, b_5, b_6, b_8 } from 'assets/business'

import { CartItemType, CategoryType, CouponType, ProductType } from 'types'
import create from 'zustand'

type ProductStoreType = {
    products: ProductType[]
    category: CategoryType[]
    cartItems: CartItemType[]
    CouponArr: CouponType[]
    addToCart: (cartItem: CartItemType) => void
    removeFromCart: (productId?: number) => void
    incrementQuantity: (productId: number) => void
    decrementQuantity: (id: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    wishlistItems: ProductType[]
    addToWishlist: (wishlistItem: ProductType) => void
    removeFromWishlist: (productId: number) => void
}

const useStore = create<ProductStoreType>((set) => ({
    products: [
        {
            id: 1,
            name: 'Pure Wildforest Honey',
            description:
                'made with pure wildforest honey (from the heart of chhattishgarh)',
            img: AYUSH_1,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '500gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'ayush products',
            isNew: false,
            //   b2bImg: b_4.src,
            //   b2bQuantity: '20 Kg',
        },
        {
            id: 2,
            name: 'Jyotishmati Oil',
            description:
                'made from pure cold pressed Coconut oil (from the heart of chhattishgarh)',
            img: AYUSH_2,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'ayush products',
            isNew: true,
            // b2bImg: b_5.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 11,
            name: 'Jyotishmati Oil',
            description:
                'made from pure cold pressed Coconut oil (from the heart of chhattishgarh)',
            img: AYUSH_3,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'ayush products',
            isNew: true,
            // b2bImg: b_5.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 12,
            name: 'Jyotishmati Oil',
            description:
                'made from pure cold pressed Coconut oil (from the heart of chhattishgarh)',
            img: AYUSH_4,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'ayush products',
            isNew: true,
            // b2bImg: b_5.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 13,
            name: 'Jyotishmati Oil',
            description:
                'made from pure cold pressed Coconut oil (from the heart of chhattishgarh)',
            img: AYUSH_5,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'ayush products',
            isNew: true,
            // b2bImg: b_5.src,
            // b2bQuantity: '10 L',
        },

        {
            id: 3,
            name: 'Ragi Cookies',
            description: 'made with pure ragi (from the heart of chhattishgarh)',
            img: GOURMEET1,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100gm',
                    currentPrice: 99,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '200gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '350gm',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'gourmet foods',
            isNew: true,
            // b2bImg: b_8.src,
            // b2bQuantity: '10 Kg',
        },
        {
            id: 4,
            name: 'Chyawanprash',
            description:
                'made with jungle harvest amla, honey and other ingredients (from the heart of chhattishgarh)',
            img: GOURMEET2,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '500gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'gourmet foods',
            isNew: false,
            // b2bImg: b_1.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 14,
            name: 'Chyawanprash',
            description:
                'made with jungle harvest amla, honey and other ingredients (from the heart of chhattishgarh)',
            img: GOURMEET3,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '500gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'gourmet foods',
            isNew: false,
            // b2bImg: b_1.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 15,
            name: 'Chyawanprash',
            description:
                'made with jungle harvest amla, honey and other ingredients (from the heart of chhattishgarh)',
            img: GOURMEET4,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '500gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'gourmet foods',
            isNew: false,
            // b2bImg: b_1.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 16,
            name: 'Chyawanprash',
            description:
                'made with jungle harvest amla, honey and other ingredients (from the heart of chhattishgarh)',
            img: GOURMEET5,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '500gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 5,
            category: 'gourmet foods',
            isNew: false,
            // b2bImg: b_1.src,
            // b2bQuantity: '20 Kg',
        },

        {
            id: 5,
            name: 'Aloe Vera Soap',
            description:
                'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
            img: PERSONAL1,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '25gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '50gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '75gm',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'personal care',
            isNew: false,
            // b2bImg: b_6.src,
            // b2bQuantity: '10 Kg',
        },
        {
            id: 6,
            name: 'Aloe Vera Bodywash',
            description:
                'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
            img: PERSONAL2,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'personal care',
            isNew: true,
            // b2bImg: b_6.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 17,
            name: 'Aloe Vera Bodywash',
            description:
                'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
            img: PERSONAL3,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'personal care',
            isNew: true,
            // b2bImg: b_6.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 18,
            name: 'Aloe Vera Bodywash',
            description:
                'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
            img: PERSONAL4,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'personal care',
            isNew: true,
            // b2bImg: b_6.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 19,
            name: 'Aloe Vera Bodywash',
            description:
                'made with jungle harvest aloe vera (from the heart of chhattishgarh)',
            img: PERSONAL5,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'personal care',
            isNew: true,
            // b2bImg: b_6.src,
            // b2bQuantity: '10 L',
        },
        {
            id: 7,
            name: 'Mahua Laddu',
            description:
                'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
            img: AYUSH_1,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '500gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'home care',
            isNew: false,
            // b2bImg: b_3.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 8,
            name: 'Mahua cookies',
            description:
                'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
            img: GOURMEET4,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500gm',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'home care',
            isNew: false,
            // b2bImg: b_3.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 20,
            name: 'Mahua cookies',
            description:
                'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
            img: AYUSH_3,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500gm',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'home care',
            isNew: false,
            // b2bImg: b_3.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 20,
            name: 'Mahua cookies',
            description:
                'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
            img: GOURMEET5,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500gm',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'home care',
            isNew: false,
            // b2bImg: b_3.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 21,
            name: 'Mahua cookies',
            description:
                'made with jungle harvest Mahua  (from the heart of chhattishgarh)',
            img: PERSONAL5,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500gm',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'home care',
            isNew: false,
            // b2bImg: b_3.src,
            // b2bQuantity: '20 Kg',
        },
        {
            id: 9,
            name: 'Amla murabba',
            description:
                'made with jungle harvest Amla  (from the heart of chhattishgarh)',
            img: SWEET2,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '250gm',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250gm',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '1kg',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'sweets',
            isNew: false,
            // b2bImg: b_5.src,
            // b2bQuantity: '30 Kg',
        },
        {
            id: 10,
            name: 'Jamun Juice',
            description:
                'made with jungle harvest Jamun  (from the heart of chhattishgarh)',
            img: SWEET1,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'sweets',
            isNew: true,
            // b2bImg: b_2.src,
            // b2bQuantity: '30 L',
        },
        {
            id: 22,
            name: 'Amla murabba',
            description:
                'made with jungle harvest Jamun  (from the heart of chhattishgarh)',
            img: SWEET2,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'sweets',
            isNew: true,
            // b2bImg: b_2.src,
            // b2bQuantity: '30 L',
        },
        {
            id: 23,
            name: 'Jamun Juice',
            description:
                'made with jungle harvest Jamun  (from the heart of chhattishgarh)',
            img: SWEET1,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'sweets',
            isNew: true,
            // b2bImg: b_2.src,
            // b2bQuantity: '30 L',
        },
        {
            id: 24,
            name: 'Amla murabba',
            description:
                'made with jungle harvest Jamun  (from the heart of chhattishgarh)',
            img: SWEET2,
            quantity: 1,
            weightAvailability: [
                {
                    weight: '100ml',
                    currentPrice: 199,
                    inStock: true,
                    discount: 10,
                },
                {
                    weight: '250ml',
                    currentPrice: 299,
                    inStock: false,
                    discount: 15,
                },
                {
                    weight: '500ml',
                    currentPrice: 399,
                    inStock: true,
                    discount: 25,
                },
            ],
            ratings: 4,
            category: 'sweets',
            isNew: true,
            // b2bImg: b_2.src,
            // b2bQuantity: '30 L',
        },
    ],
    category: [
        {
            id: 1,
            categoryName: 'Ayush Product',
            img: AYUSH,
        },
        {
            id: 2,
            categoryName: 'Gourmet Food',
            img: GFOOD,
        },
        {
            id: 3,
            categoryName: 'Personal Care',
            img: PCARE,
        },
        {
            id: 4,
            categoryName: 'Home Care',
            img: HOMECARE,
        },
        {
            id: 5,
            categoryName: 'Sweets',
            img: SWEETS,
        },
    ],
    CouponArr: [
        {
            id: 1,
            code: 'COUPON1',
            discount: '10%',
            description: 'Use code COUPON1 to get Rs.50 OFF on orders above Rs.400',
            term1:
                'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without',
            term2:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            expiry: '20/12/2020',
            discountValue: 30,
        },
        {
            id: 2,
            code: 'COUPON2',
            discount: '20%',
            description: '20% discount on all products',
            term1:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae',
            term2:
                'totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam  quasi aliquam eligendi, placeat qui corporis!',
            expiry: '20/12/2020',
            discountValue: 20,
        },
    ],
    //TODO: CART_ITEM

    cartItems: [],
    //--------  //TODO: ADD_TO_CART

    addToCart: (cartItem) => {
        set((state) => ({
            cartItems: [...state.cartItems, cartItem],
        }))
    },

    //TODO: REMOVE_FROM_CART

    removeFromCart: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.filter(
                (cartItem) => cartItem?.product?.id !== productId
            ),
        }))
    },

    //TODO: INCREMENT_QUANTITY

    incrementQuantity: (productID) => {
        set((state) => ({
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.product.id === productID)
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    }
                return cartItem
            }),
        }))
    },
    //TODO: DECREMENT_QUANTITY
    decrementQuantity: (id) => {
        set((state) => ({
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem.product.id === id)
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                    }
                return cartItem
            }),
        }))
    },

    //TODO: UPDATE_QUANTITY ( BOTH INCR & DECR )

    updateQuantity: (productID, quantity) => {
        set((state) => ({
            cartItems: state.cartItems.map((cartItem) => {
                if (cartItem?.product?.id === productID)
                    return {
                        ...cartItem,
                        quantity: quantity,
                    }
                return cartItem

            }),
        }))
    },


    //TODO: Wishlist

    wishlistItems: [],


    //TODO: ADD_TO_WISHLIST

    addToWishlist: (wishlistItem) => {
        set((state) => ({
            wishlistItems: [wishlistItem, ...state.wishlistItems],
        }))
    },

    //TODO: REMOVE_FROM_WISHLIST

    removeFromWishlist: (productId) => {
        set((state) => ({
            wishlistItems: state.wishlistItems.filter(
                (product) => product.id !== productId
            ),
        }))
    },
}))

export default useStore