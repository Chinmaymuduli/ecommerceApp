import { ImageSourcePropType } from "react-native";
import type { APIFunction } from './api';

export type quantity = {
    id?: number;
    label?: string;
    discount?: number
    img?: any
    offer?: string;
    price?: number;
    quantity?: number;
}

export type CategoryType = {
    id: number
    img?: ImageSourcePropType
    categoryName?: string
}
type ChooseWeight = {
    weight?: string
    currentPrice?: number | any
    inStock?: boolean
    discount?: number
}

export type ProductDetailsType = {
    id?: number
    name?: string
    description?: string
    img?: string | any
    currentPrice?: number | any
    inStock?: boolean
    quantity?: number
    weight?: number
    ratings?: number
    category?: string
    discount?: number | any
    new?: boolean
    offer?: string
    couponValue?: any;
    discountCoupon?: any
    orderId?: number
    weightAvailability?: weightType[]
    chooseWeight?: ChooseWeight
}
export type HomeProductType = {
    id: number
    name?: string
    discount?: number | any
    img?: string | any
    currentPrice?: number | any
    offer?: string
    moq?: number
}

export type AddressType = {
    firstName?: string
    phoneNumber?: string | number
    city?: string
    housenumber?: string
    roadName?: string
}

export type CartType =
    {
        id: number;
        name: string;
        discount: number;
        img: string | any;
        currentPrice: number | any;
        offer: string;
        quantity: number;
    }
// *****


export type CartItemType = {
    // product: ProductDetailsType
    product: ProductType
    quantity: number
    weight?: weightType
}
// *****
export type changePasswordType = {
    newPassword?: string
    retypePassword?: string
}
export type reviewType = {
    img: ImageSourcePropType
    name: string
    rating: number
    date: string
    review: string
}
export type activeOrderType = {
    name: string;
    OrderID: string;
    status: string;
    currentPrice: number;
    img: any;
    total: string | number;
}

export type SelectQuantityType = {
    // label: string;
    // value: number;
    // price: number;
    // discount: number;
    // offer: string;
    weight?: string
    currentPrice?: number
    inStock?: boolean
    discount?: number


}
export type WishListCardType = {
    label?: string
    price?: number
    ratingsby?: number
    img?: string | any
    discount?: number
    offer?: string
}

export type PastOrderType = {
    name: string;
    OrderID: string;
    status: string;
    currentPrice: number;
    img: string | any;
    total: string;
};

// Zustand
type weightType = {
    weight?: string
    currentPrice?: number
    inStock?: boolean
    discount?: number
}
export type ProductType = {
    id: number
    name?: string
    description?: string
    img?: ImageSourcePropType
    quantity?: number
    weightAvailability?: weightType[]
    ratings?: number
    category?: string
    isNew?: boolean
    b2bImg?: ImageSourcePropType
    b2bQuantity?: string
}
export type CouponType = {
    id?: number
    code?: string
    discount?: string
    term1?: string
    term2?: string
    expiry?: string
    discountValue?: number
    description?: string
}

export type Pagination = { page?: number; limit?: number };

export type User = {
    Age?: string;
    academicLevel?: string;
    uid: string;
    displayName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    isBlocked: boolean;
    photoURL?: string;
    photoRef?: string;
    // role: UserRole;
    _vid: number;
    // nationality?: Country;
    // gender?: Gender;
    phone?: string;
    address?: string;
    stallId?: string;
    isOnline?: boolean;
    place?: string;
    // profession?:
    // | 'Student'
    // | 'Parent'
    // | 'School Counsellors / Administrative'
    // | 'Visitors'
    // | 'Other';
};

export { APIFunction };