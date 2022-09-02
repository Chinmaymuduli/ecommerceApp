import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// import BottomTab from './BottomTab';
import {
  Address,
  B2BAccount,
  Cart,
  Category,
  ChangePassword,
  ConfirmOrder,
  Coupon,
  EditProfile,
  Home,
  MyReview,
  Notifications,
  Order,
  OrderDetails,
  OrderSummary,
  PaymentScreen,
  ProductDetails,
  Profile,
  Search,
  SelectAddress,
  SupportUs,
  WishList,
} from 'screens';
import BottomTab from './BottomTab';
import {ProductDetailsType, ProductType} from 'types';

export type PrivateRoutesType = {
  Home: undefined;
  Cart: {
    isBack?: boolean;
  };
  Category: {
    id?: number | any;
    b2b?: boolean;
    isBussiness?: boolean;
    _id?: string;
  };
  Search: undefined;
  Order: undefined;
  Bottomtab: undefined;
  ProductDetails: {
    ProductDetailsType: ProductType;
  };
  Coupon: {
    couponId?: string;
    type?: string;
    quantity?: number;
    productId?: string;
    addressId?: string | null;
    totalPrice?: number;
  };
  Address: {
    type?: string;
    quantity?: number;
    productId?: string;
  };
  PaymentScreen: {
    type?: string;
    quantity?: number;
    productId?: string;
    addressId?: string | null;
    totalMrp?: number;
    totalSalePrice?: number;
    discount?: number;
    couponId?: string;
  };
  ConfirmOrder: {
    totalMrp?: number;
    discount?: number;
    deliveryCharges?: number;
    couponDiscount?: number;
    totalSalePrice?: number;
  };
  // {
  //   confirmOrderData: CartItemType[];
  // };
  OrderSummary: {
    productId?: string;
    type?: string;
    quantity?: number;
  };
  SelectAddress: {
    isProfile?: boolean;
    type?: string;
    quantity?: number;
    productId?: string;
  };
  WishList: undefined;
  OrderDetails: {
    orderId?: string;
  };
  Notifications: undefined;
  Profile: undefined;
  SupportUs: undefined;
  EditProfile: undefined;
  MyReview: undefined;
  ChangePassword: undefined;
  B2BAccount: undefined;
};
export type NavigationProps = NativeStackNavigationProp<PrivateRoutesType>;
const Stack = createNativeStackNavigator<PrivateRoutesType>();

const PrivateRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {fontFamily: 'Nunito-Bold'},
      }}>
      <Stack.Screen name="Bottomtab" component={BottomTab} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen
        name="Coupon"
        component={Coupon}
        options={{
          title: 'Coupons',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          title: 'Add address',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: 'Payments',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        // options={{
        //   title: 'Confirm Order',
        //   headerShown: true,
        //   headerBackTitleVisible: false,
        //   headerTintColor: '#000',
        // }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{
          title: 'Order Summary',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="SelectAddress"
        component={SelectAddress}
        options={{
          title: 'Select Address',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen name="WishList" component={WishList} />

      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: 'Order Details',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Notifications',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="SupportUs"
        component={SupportUs}
        options={{
          title: 'Support Us',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="MyReview"
        component={MyReview}
        options={{
          title: 'My Review',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="B2BAccount"
        component={B2BAccount}
        // options={{
        //   title: 'Account',
        //   headerShown: true,
        //   headerBackTitleVisible: false,
        //   headerTintColor: '#000',
        // }}
      />
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
