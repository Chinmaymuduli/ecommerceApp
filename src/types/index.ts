import { ImageSourcePropType } from "react-native";

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
    id?: number
    img?: string
    categoryName?: string
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
}
export type HomeProductType = {
    id?: number
    name?: string
    discount?: number | any
    img?: string | any
    currentPrice?: number | any
    offer?: string
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
    label: string;
    value: number;
    price: number;
    discount: number;
    offer: string;
}
export type WishListCardType = {
    label?: string
    price?: number
    ratingsby?: number
    img?: string | any
    discount?: number
    offer?: string
}