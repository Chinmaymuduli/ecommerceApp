import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {ICONS} from 'assets';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Home} from 'screens';
import Animated from 'react-native-reanimated';

const DrawerArray = [
  {
    id: 1,
    name: 'Home',
    route: 'Home',
    icon: <ICONS.Home size={25} color={COLORS.textWhite} />,
  },
  {
    id: 2,
    name: 'Cart',
    route: 'Cart',
    icon: <ICONS.Bag size={25} color={COLORS.textWhite} />,
  },
  {
    id: 3,
    name: 'Cart',
    route: 'Cart',
    icon: <ICONS.Bag size={25} color={COLORS.textWhite} />,
  },
  {
    id: 4,
    name: 'Cart',
    route: 'Cart',
    icon: <ICONS.Bag size={25} color={COLORS.textWhite} />,
  },
  {
    id: 5,
    name: 'Cart',
    route: 'Cart',
    icon: <ICONS.Bag size={25} color={COLORS.textWhite} />,
  },
  {
    id: 6,
    name: 'Cart',
    route: 'Cart',
    icon: <ICONS.Bag size={25} color={COLORS.textWhite} />,
  },
];

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({navigation}: any) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{flex: 1}}>
      <Box flex={1} px={2}>
        {/* Close Icon */}
        <Box alignItems={'flex-start'} justifyContent={'center'} mt={3}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <ICONS.Close size={25} color={COLORS.textWhite} />
          </TouchableOpacity>
        </Box>
        {/* Profile */}

        <Pressable
          flexDirection={'row'}
          mt={8}
          alignItems={'center'}
          onPress={() => console.log('Profile')}>
          <Image
            alt="drawerImg"
            source={{
              uri: 'https://t3.ftcdn.net/jpg/01/17/72/36/240_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg',
            }}
            // resizeMode={'cover'}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
          <VStack ml={3}>
            <Text color={COLORS.textWhite} bold>
              Chinmay Muduli
            </Text>
            <Text color={COLORS.textWhite}>View your profile</Text>
          </VStack>
        </Pressable>
        {/* Drawer Item */}
        <Box flex={1} mt={5}>
          {DrawerArray.map((item: any) => (
            <Pressable
              key={item.id}
              flexDirection={'row'}
              alignItems={'center'}
              height={10}
              mb={5}
              pl={3}
              borderRadius={10}
              // bg={}
              onPress={() => {}}>
              {item?.icon}
              <Text pl={4} color={COLORS.textWhite}>
                {item?.name}
              </Text>
            </Pressable>
          ))}
          {/* Line Divider */}
          <Divider />
        </Box>
      </Box>
    </DrawerContentScrollView>
  );
};
const CustomDrawer = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });
  // console.log('object', borderRadius);
  const animatedStyle = {borderRadius, transform: [{scale}]};
  // console.log('CustomDrawer', animatedStyle);
  return (
    <Box flex={1} bg={'#065934'}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            flex: 1,
            width: '65%',
            paddingRight: 20,
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        initialRouteName="Home"
        drawerContent={(props: any) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return <CustomDrawerContent navigation={props.navigation} />;
        }}>
        <Drawer.Screen name="Home">
          {(props: any) => (
            <Home {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </Box>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
