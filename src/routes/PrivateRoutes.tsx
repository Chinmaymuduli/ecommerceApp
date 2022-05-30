import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// import BottomTab from './BottomTab';
import {
  Cart,
  Category,
  Home,
  Offers,
  Order,
  ProductDetails,
  Search,
} from 'screens';
import BottomTab from './BottomTab';
import {CustomDrawer} from 'components/core';
// import {Stall, EventType, User} from 'types';

export type PrivateRoutesType = {
  Home: undefined;
  Cart: undefined;
  Category: undefined;
  Offers: undefined;
  Search: undefined;
  Order: undefined;
  Bottomtab: undefined;
  ProductDetails: undefined;
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
        options={{
          title: 'Cart',
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#000',
        }}
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
    </Stack.Navigator>
  );
};

export default PrivateRoutes;
