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
// import {Stall, EventType, User} from 'types';

export type PrivateRoutesType = {
  Home: undefined;
  Cart: {
    isBack?: boolean;
  };
  Category: {
    id?: number | any;
    b2b?: boolean;
  };
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
  Coupon: {
    label?: string;
    discount?: number | any;
    price?: number | any;
    offer?: string | any;
    id?: number;
    img?: any;
  };
  Address: undefined;
  PaymentScreen: {
    label?: string;
    discount?: number | any;
    price?: number | any;
    offer?: string | any;
    id?: number;
    img?: any;
    couponValue?: any;
  };
  ConfirmOrder: {
    label?: string;
    discount?: number | any;
    price?: number | any;
    offer?: string | any;
    id?: number;
    img?: any;
    orderId?: number;
  };
  OrderSummary: {
    label?: string;
    discount?: number | any;
    price?: number | any;
    offer?: string | any;
    id?: number;
    img?: any;
  };
  SelectAddress: {
    label?: string;
    discount?: number | any;
    price?: number | any;
    offer?: string | any;
    id?: number;
    img?: any;
  };
  WishList: undefined;
  OrderDetails: undefined;
  Notifications: undefined;
  Profile: undefined;
  SupportUs: undefined;
  EditProfile: undefined;
  MyReview: undefined;
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
      {/* <Stack.Screen name="Category" component={Category} /> */}

      <Stack.Screen name="Search" component={Search} />
      {/* <Stack.Screen name="Order" component={Order} /> */}
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
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
