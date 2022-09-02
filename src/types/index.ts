import {ImageSourcePropType} from 'react-native';
import type {APIFunction} from './api';

export type quantity = {
  id?: number;
  label?: string;
  discount?: number;
  img?: string;
  offer?: string;
  price?: number;
  quantity?: number;
};

export type CategoryType = {
  id: number;
  img?: ImageSourcePropType;
  categoryName?: string;
  //Api Type
  _id?: string;
  name?: string;
  description?: string;
  parentCategory?: string;
  isActive?: boolean;
  imageURL?: string;
};
type ChooseWeight = {
  weight?: string;
  currentPrice?: number | any;
  inStock?: boolean;
  discount?: number;
};

export type ProductDetailsType = {
  id?: number;
  name?: string;
  description?: string;
  // img?: string | any;
  img?: string;
  currentPrice?: number | any;
  inStock?: boolean;
  quantity?: number;
  weight?: number;
  ratings?: number;
  category?: string;
  discount?: number | any;
  new?: boolean;
  offer?: string;
  couponValue?: any;
  discountCoupon?: any;
  orderId?: number;
  weightAvailability?: weightType[];
  chooseWeight?: ChooseWeight;
};
export type HomeProductType = {
  weightAvailability?: weightType[];
  id: number;
  name?: string;
  discount?: number | any;
  img?: ImageSourcePropType;
  currentPrice?: number | any;
  offer?: string;
  moq?: number;
  mrp: number;
  salePrice: number;
  images?: ImageSourcePropType[];
  title?: string;
};

export type AddressType = {
  _id: string;
  user: User;
  name: string;
  landmark: string;
  email: string;
  phoneNumber: number;
  countryCode: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  isDefault: boolean;
  type: string;
};

export type CartType = {
  id: number;
  name: string;
  discount: number;
  img: ImageSourcePropType;
  // img: string | any;
  currentPrice: number | any;
  offer: string;
  quantity: number;
};
// *****

export type CartItemType = {
  _id: string;

  // product: ProductDetailsType
  product: ProductType;
  quantity: number;
  weight?: weightType;

  products?: ProductType[];
  displayImage?: {
    url?: string;
  };
};
// *****
export type changePasswordType = {
  Password?: string;
  retypePassword?: string;
  OTP?: number;
};
export type reviewType = {
  name: string;
  rating: number;
  date: string;
  review: string;
  order: {product?: ProductType};
  updatedAt?: string;
  comment?: string;
  title?: string;
  _id?: string;
};
export type activeOrderType = {
  name: string;
  totalPrice?: number;
  product: ProductType;
  quantity: number;
  _id: string;
  status?: string;
  displayImage?: {
    url?: string;
  };
};

export type SelectQuantityType = {
  weight?: string;
  currentPrice?: number;
  inStock?: boolean;
  discount?: number;
};
export type WishListCardType = {
  label?: string;
  price?: number;
  ratingsby?: number;
  img?: ImageSourcePropType;
  // img?: string | any;
  discount?: number;
  offer?: string;
};

export type PastOrderType = {
  quantity: number | undefined;
  OrderID: string;
  status: string;
  img: ImageSourcePropType;
  // img: string | any;
  total: string;
  _id?: string;
  product?: ProductType;
  totalPrice?: number;
};

// Zustand
type weightType = {
  weight?: string;
  currentPrice?: number;
  inStock?: boolean;
  discount?: number;
};

export type ProductVariants = {
  _id?: string;
  measureType: string;
  measureUnit: number;
  mrp: number;
  review: {
    total: number;
    star: number;
  };
  salePrice: number;
  stock: number;
};
export type ProductType = {
  reviews: {
    stars: number;
    total: number;
  };
  id: number;
  name?: string;
  description?: string;
  img?: ImageSourcePropType;
  quantity?: number;
  weightAvailability?: weightType[];
  ratings?: number;
  category?: string;
  isNew?: boolean;
  b2bImg?: ImageSourcePropType;
  b2bQuantity?: string;
  // Api type
  _id?: string | any;
  isActive?: boolean;
  measureType?: string;
  measureUnit?: number;
  mrp: number;
  salePrice: number;
  shortDescription?: string;
  stock?: number;
  title?: string;
  type?: string;
  images?: ImageSourcePropType[];
  variants?: ProductVariants[];
  products?: ProductType[];
  isInCart?: boolean;
  isInWishList?: boolean;
  isFeatured?: boolean;
  cartQuantity?: number;
  moq?: number;
  displayImage?: {
    url?: string;
  };
};
export type CouponType = {
  id?: number;
  code?: string;
  discount?: string;
  term1?: string;
  term2?: string;
  expiry?: string;
  discountValue?: number;
  description?: string;
};

export type Pagination = {page?: number; limit?: number};

export type User = {
  Age?: string;
  _id: string;
  displayName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  isBlocked: boolean;
  photoURL?: string;
  photoRef?: string;
  _vid: number;
  // nationality?: Country;
  gender?: string;
  phoneNumber?: number;
  address?: string;
  stallId?: string;
  isOnline?: boolean;
  place?: string;
  GSTDoc?: string;
  GSTNumber?: string;
  avatar?: string;
  cartCount?: number;
  GSTDocType?: string;
};
// Api Types
export type ApiProductType = {
  title?: string;
  shortDescription?: string;
  description?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  category?: CategoryType;
  stock?: number;
  salePrice: number;
  mrp?: number;
  displayImage?: ImageSourcePropType;
  images?: ImageSourcePropType[];
  variantOf?: ProductType;
  measureType?: 'kg' | 'gm' | 'ltr' | 'ml' | 'pc';
  measureUnit?: number;
  type?: 'B2B' | 'B2C';
  reviews?: {
    total: number;
    stars: number;
  };
};
export type ReviewType = {
  product: ProductType;
  _id?: string;
  user: User;
  rating: number;
  title: string;
  comment: string;
  order: {
    user: User;
  };
};

export type BannerType = {
  _id?: string;
  title?: string;
  description?: string;
  imageURL?: string;
  imagePath?: string;
};

export type ApiAuthType = {
  path: string;
  body?: RequestInit['body'];
  method?: 'POST' | 'PUT' | 'GET' | 'DELETE';
};

export {APIFunction};
