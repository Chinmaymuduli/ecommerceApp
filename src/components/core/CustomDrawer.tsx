import {StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {ICONS} from 'assets';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import Materialicons from 'react-native-vector-icons/MaterialIcons';
import {useAppContext} from 'contexts';

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
    route: 'Business',
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
    route: 'Favorite',
  },
  {
    id: 6,
    label: 'Notification',
    icon: ({color}: {color: string}) => (
      <ICONS.Notification size={22} color={color || '#000'} />
    ),
    route: 'Notification',
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
    label: 'Support Us',
    icon: ({color}: {color: string}) => (
      <ICONS.Support size={22} color={color || '#000'} />
    ),
    route: 'Profile',
  },
  {
    id: 9,
    label: 'Terms & Conditions',
    icon: ({color}: {color: string}) => (
      <ICONS.TermAndCondition size={22} color={color || '#000'} />
    ),
    route: 'Profile',
  },
  {
    id: 10,
    label: 'Exit App',
    icon: ({color}: {color: string}) => (
      <ICONS.ExitApp size={22} color={color || '#000'} />
    ),
    route: 'Profile',
  },
];

const CustomDrawer = () => {
  const navigation = useNavigation();
  const [selectedButton, setSelectedButton] = React.useState(1);
  // console.log('object', selectedButton);
  const {setIsLoggedIn} = useAppContext();
  const DrawerNaviagte = (item: any) => {
    setSelectedButton(item?.id);
    navigation.navigate(item?.route);
  };
  return (
    <Box flex={1}>
      <HStack
        space={3}
        alignItems={'center'}
        justifyContent={'center'}
        pt={7}
        px={4}>
        <Image
          alt="drawerImage"
          source={{
            uri: 'https://t3.ftcdn.net/jpg/01/17/72/36/240_F_117723612_z7zQmUrrpG4IRGQLvgX5nwtwC18ke3qU.jpg',
          }}
          style={styles.drawerImage}
        />
        <VStack>
          <Heading size={'xs'}>Chinmay muduli</Heading>
          <Text numberOfLines={1}>demouser@gmail.com</Text>
        </VStack>
      </HStack>
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
            bg={selectedButton === item.id ? '#4F7942' : '#fff'}
            mt={2}
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
                bg={selectedButton === item?.id ? COLORS.textWhite : '#C1E1C1'}
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
      <Box px={5}>
        <Pressable onPress={() => setIsLoggedIn(false)}>
          <HStack justifyContent={'space-between'}>
            <HStack space={3}>
              <Materialicons name="power-settings-new" size={22} color="#000" />
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
