import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ICONS} from 'assets';
import {CustomDrawer} from 'components/core';
import {COLORS} from 'configs';
import {Box, Text} from 'native-base';

import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import Icon, {Icons} from '../components/core/Icons';
// import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';
import {Category, Home, Order, Search, Cart} from 'screens';
import Icon, {Icons} from '../components/core/Icons';

const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Ionicons,
    icon: 'home-outline',
    component: Home,
  },
  {
    route: 'Category',
    label: 'Category',
    type: Icons.MaterialCommunityIcons,
    icon: 'dots-square',
    component: Category,
  },
  {
    route: 'Search',
    label: 'Search',
    type: Icons.Ionicons,
    icon: 'search-outline',
    component: Search,
  },
  {
    route: 'Order',
    label: 'Order',
    type: Icons.Feather,
    icon: 'shopping-bag',
    component: Order,
  },
  {
    route: 'Cart',
    label: 'Cart',
    type: Icons.Ionicons,
    icon: 'cart-outline',
    component: Cart,
  },
];

const Tab = createBottomTabNavigator();
const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  //   0.3: {scale: 0.9},
  //   0.5: {scale: 0.2},
  //   0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

// const TabButton = (props: any) => {
//   const {item, onPress, accessibilityState} = props;
//   const focused = accessibilityState.selected;
//   const viewRef = useRef<any>(null);
//   const circleRef = useRef<any>(null);
//   const textRef = useRef<any>(null);

//   useEffect(() => {
//     if (focused) {
//       viewRef.current.animate(animate1);
//       circleRef.current.animate(circle1);
//       textRef.current.transitionTo({scale: 1});
//     } else {
//       viewRef.current.animate(animate2);
//       circleRef.current.animate(circle2);
//       textRef.current.transitionTo({scale: 0});
//     }
//   }, [focused]);

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={1}
//       style={styles.container}>
//       <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
//         <View style={styles.btn}>
//           <Animatable.View ref={circleRef} style={styles.circle} />
//           <Icon
//             type={item?.type}
//             name={item.icon}
//             color={focused ? COLORS.textWhite : COLORS.cgcolor}
//           />
//         </View>
//         <Animatable.Text ref={textRef} style={styles.text}>
//           {item.label}
//         </Animatable.Text>
//       </Animatable.View>
//     </TouchableOpacity>
//   );
// };

const CustomTabbarButton = ({children, onPress}: any) => (
  // <Box>
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -28,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Box borderRadius={35} bg={COLORS.lightGrey}>
      <Box w={55} h={55} borderRadius={35} bg={COLORS.cgcolor}>
        {children}
      </Box>
    </Box>
  </TouchableOpacity>
  // </Box>
);

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}>
      {/* {TabArr?.map((item: any, index: any) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );

      })} */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems={'center'} justifyContent={'center'}>
              <Icon
                type={Icons.Ionicons}
                name="home"
                color={focused ? COLORS.cgcolor : '#748C94'}
              />
              <Text
                color={focused ? COLORS.cgcolor : '#748C94'}
                fontSize={12}
                bold>
                Home
              </Text>
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems={'center'} justifyContent={'center'}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name="dots-square"
                color={focused ? COLORS.cgcolor : '#748C94'}
              />
              <Text
                color={focused ? COLORS.cgcolor : '#748C94'}
                fontSize={12}
                bold>
                Category
              </Text>
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon type={Icons.Ionicons} name="search-outline" color={'#fff'} />
          ),
          tabBarButton: props => <CustomTabbarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems={'center'} justifyContent={'center'}>
              <Icon
                type={Icons.FontAwesome5}
                name="shopping-bag"
                color={focused ? COLORS.cgcolor : '#748C94'}
              />
              <Text
                color={focused ? COLORS.cgcolor : '#748C94'}
                fontSize={12}
                bold>
                Order
              </Text>
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems={'center'} justifyContent={'center'}>
              <Icon
                type={Icons.Ionicons}
                name="cart"
                color={focused ? COLORS.cgcolor : '#748C94'}
              />
              <Text
                color={focused ? COLORS.cgcolor : '#748C94'}
                fontSize={12}
                bold>
                Cart
              </Text>
            </Box>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 42,
    height: 42,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: COLORS.textWhite,
    backgroundColor: COLORS.textWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cgcolor,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.cgcolor,
    fontFamily: 'Nunito-Bold',
  },
});
