import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// import BottomTab from './BottomTab';
import {
  Address,
  Cart,
  Category,
  ConfirmOrder,
  Coupon,
  Home,
  Offers,
  Order,
  OrderSummary,
  PaymentScreen,
  ProductDetails,
  Search,
  SelectAddress,
} from 'screens';
import BottomTab from './BottomTab';
import {CustomDrawer} from 'components/core';
import {quantity} from 'types';
// import {Stall, EventType, User} from 'types';

export type PrivateRoutesType = {
  Home: undefined;
  Cart: {
    isBack?: boolean;
  };
  Category: undefined;
  Offers: undefined;
  Search: undefined;
  Order: undefined;
  Bottomtab: undefined;
  ProductDetails: {
    label?: string;
    discount?: number;
    price?: number;
    offer?: string;
    id?: number;
    img?: any;
  };
  Coupon: undefined;
  Address: undefined;
  PaymentScreen: {
    label?: string;
    discount?: number;
    price?: number;
    offer?: string;
    id?: number;
    img?: any;
  };
  ConfirmOrder: {
    label?: string;
    discount?: number;
    price?: number;
    offer?: string;
    id?: number;
    img?: any;
    orderId?: number;
  };
  OrderSummary: {
    label?: string;
    discount?: number;
    price?: number;
    offer?: string;
    id?: number;
    img?: any;
  };
  SelectAddress: undefined;
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
      <Stack.Screen
        name="Cart"
        component={Cart}
        // options={{
        //   title: 'Cart',
        //   headerShown: true,
        //   headerBackTitleVisible: false,
        //   headerTintColor: '#000',
        // }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: 'Category',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{
          title: 'Offers',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Search',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'Order',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
      />
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
        options={{
          title: 'Confirm Order',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
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
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
