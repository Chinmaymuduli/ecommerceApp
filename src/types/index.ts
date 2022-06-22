export type quantity = {
    id?: number;
    label?: string;
    discount?: number
    img?: any
    offer?: string;
    price?: number;
    quantity?: number;
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
    // b2bImg?: string
    // b2bQuantity?: number
}
export type CategoryType = {
    id?: number
    img?: string
    categoryName?: string
}

