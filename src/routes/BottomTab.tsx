import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth, useStore} from 'app';
import {COLORS} from 'configs';
import {Badge, Box, Text} from 'native-base';

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Category, Home, Order, Search, Cart} from 'screens';
import Icon, {Icons} from '../components/core/Icons';

const Tab = createBottomTabNavigator();

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
      <Box w={55} h={55} borderRadius={35} bg={COLORS.primary}>
        {children}
      </Box>
    </Box>
  </TouchableOpacity>
  // </Box>
);

export default function BottomTab() {
  const {user} = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Box alignItems={'center'} justifyContent={'center'}>
              <Icon
                type={Icons.Ionicons}
                name="home"
                color={focused ? COLORS.primary : '#748C94'}
              />
              <Text
                color={focused ? COLORS.primary : '#748C94'}
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
                color={focused ? COLORS.primary : '#748C94'}
              />
              <Text
                color={focused ? COLORS.primary : '#748C94'}
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
                color={focused ? COLORS.primary : '#748C94'}
              />
              <Text
                color={focused ? COLORS.primary : '#748C94'}
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
            <>
              <Box alignItems={'center'} justifyContent={'center'} mb={3}>
                <Badge
                  colorScheme="danger"
                  rounded="full"
                  mb={-3}
                  mr={-3}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                  _text={{
                    fontSize: 10,
                  }}>
                  {user?.cartCount ? user?.cartCount : 0}
                </Badge>
                <Icon
                  type={Icons.Ionicons}
                  name="cart"
                  color={focused ? COLORS.primary : '#748C94'}
                />
                <Text
                  color={focused ? COLORS.primary : '#748C94'}
                  fontSize={12}
                  bold>
                  Cart
                </Text>
              </Box>
            </>
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
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: 'Nunito-Bold',
  },
});
