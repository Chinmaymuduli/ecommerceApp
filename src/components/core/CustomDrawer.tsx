import {Alert, BackHandler, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {ICONS} from 'assets';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import Materialicons from 'react-native-vector-icons/MaterialIcons';
import {useAppContext} from 'contexts';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useAuth} from 'app';
import {
  useActions,
  useAuthFetch,
  useFetch,
  useIsMounted,
  useSwrApi,
} from 'hooks';
import {post, put} from 'api';
import {User} from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const drawerArray = [
  {
    id: 1,
    label: 'Home',
    icon: ({color}: {color: string}) => (
      <ICONS.Home size={22} color={color || '#000'} />
    ),
    route: 'Home',
  },
  {
    id: 2,
    label: 'Category',
    icon: ({color}: {color: string}) => (
      <ICONS.Category size={22} color={color || '#000'} />
    ),
    route: 'Category',
  },
  {
    id: 3,
    label: 'Business',
    icon: ({color}: {color: string}) => (
      <ICONS.Business size={22} color={color || '#000'} />
    ),
    route: 'Category',
  },
  {
    id: 4,
    label: 'Order',
    icon: ({color}: {color: string}) => (
      <ICONS.Order size={22} color={color || '#000'} />
    ),
    route: 'Order',
  },
  {
    id: 5,
    label: 'Your Wishlist',
    icon: ({color}: {color: string}) => (
      <ICONS.Favorite size={22} color={color || '#000'} />
    ),
    route: 'WishList',
  },
  {
    id: 6,
    label: 'Notification',
    icon: ({color}: {color: string}) => (
      <ICONS.Notification size={22} color={color || '#000'} />
    ),
    route: 'Notifications',
  },
  {
    id: 7,
    label: 'Your Account',
    icon: ({color}: {color: string}) => (
      <ICONS.User size={22} color={color || '#000'} />
    ),
    route: 'Profile',
  },
  {
    id: 8,
    label: 'Support',
    icon: ({color}: {color: string}) => (
      <ICONS.Support size={22} color={color || '#000'} />
    ),
    route: 'SupportUs',
  },
  {
    id: 9,
    label: 'Terms & Conditions',
    icon: ({color}: {color: string}) => (
      <ICONS.TermAndCondition size={22} color={color || '#000'} />
    ),
    route: 'Terms & Conditions',
  },
  {
    id: 10,
    label: 'Privacy Policy',
    icon: ({color}: {color: string}) => (
      <ICONS.Privacy size={22} color={color || '#000'} />
    ),
    route: 'Terms & Conditions',
  },
  {
    id: 11,
    label: 'Exit App',
    icon: ({color}: {color: string}) => (
      <ICONS.ExitApp size={22} color={color || '#000'} />
    ),
    route: 'ExitApp',
  },
];

const CustomDrawer = () => {
  const navigation = useNavigation<NavigationProps>();
  const [selectedButton, setSelectedButton] = React.useState(1);
  const {user, setLoggedIn, setUserType} = useAuth(state => state);

  // console.log({user});
  const {data, isValidating} = useSwrApi('user/my-account');
  const UserData = data?.data?.data;

  // console.log({UserData});

  const DrawerNaviagte = (item: any) => {
    setSelectedButton(item?.id);
    if (item?.route === 'ExitApp') return handelCloseApp();
    if (item?.label === 'Business')
      return setUserType('b2b'), navigation.navigate(item?.route);
    if (item?.label === 'Category')
      return setUserType('b2c'), navigation.navigate(item?.route);
    navigation.navigate(item?.route);
  };

  const handelCloseApp = useCallback(() => {
    Alert.alert(
      'Exit App',
      'Are You Sure?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: true},
    );
  }, []);

  const handleLogout = async () => {
    try {
      const logRes = await put({
        path: 'auth/logout',
      });
      await AsyncStorage.setItem('isLoggedIn', 'false')
        .then(() => {
          console.log('Logout Success');
          setLoggedIn(false);
        })
        .catch(error => console.log(error));
    } catch (error) {}
  };

  return (
    <Box flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <HStack
            space={3}
            alignItems={'center'}
            justifyContent={'center'}
            pt={7}
            px={4}>
            <Image
              alt="drawerImage"
              source={{
                uri: UserData?.photoURL
                  ? UserData?.photoURL
                  : 'https://t3.ftcdn.net/jpg/01/17/72/36/240_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg',
              }}
              style={styles.drawerImage}
            />
            <VStack>
              <Heading size={'xs'}>{UserData?.displayName}</Heading>
              <Text numberOfLines={1}>{UserData?.email}</Text>
            </VStack>
          </HStack>
        </Pressable>
        <Box alignItems={'center'} py={5}>
          <Divider w={250} />
        </Box>
        <Box>
          {drawerArray.map(item => (
            <Pressable
              onPress={() => DrawerNaviagte(item)}
              key={item.id}
              py={3}
              px={3}
              bg={selectedButton === item.id ? COLORS.secondary : '#fff'}
              // mt={2}
              borderRadius={10}
              mx={2}>
              <HStack justifyContent={'space-between'}>
                <HStack key={item?.id} space={4} alignItems={'center'}>
                  <Box>
                    {item.icon({
                      color: selectedButton === item.id ? '#fff' : '#000',
                    })}
                  </Box>
                  <Box>
                    <Text
                      color={
                        selectedButton === item.id ? COLORS.textWhite : '#000'
                      }>
                      {item.label}
                    </Text>
                  </Box>
                </HStack>
                <Box
                  bg={
                    selectedButton === item?.id ? COLORS.textWhite : '#C1E1C1'
                  }
                  borderRadius={20}>
                  <ICONS.ChevronRight
                    size={22}
                    color={'#000'}
                    style={{padding: 10}}
                  />
                </Box>
              </HStack>
            </Pressable>
          ))}
        </Box>
        <Box py={2}>
          <Divider />
        </Box>
        <Box px={5} mb={8} mt={2}>
          <Pressable onPress={handleLogout}>
            <HStack justifyContent={'space-between'}>
              <HStack space={3}>
                <Materialicons
                  name="power-settings-new"
                  size={22}
                  color="#000"
                />
                <Text>Sign Out</Text>
              </HStack>
              <Box bg={'#C1E1C1'} borderRadius={20}>
                <ICONS.ChevronRight
                  size={22}
                  color={'#000'}
                  style={{padding: 10}}
                />
              </Box>
            </HStack>
          </Pressable>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
