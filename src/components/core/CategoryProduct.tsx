import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import HomeCategoryItem from './HomeCategoryItem';

type CategoryProductType = {
  title?: string;
  data?: any;
  image?: string | any;
  label?: string;
  discount?: string;
  price?: string;
};

const CategoryProduct = ({title, data}: CategoryProductType) => {
  const navigation = useNavigation<NavigationProps>();
  const [wishlist, setWishlist] = useState<any>([]);
  const [count, setCount] = React.useState(0);
  const {cartItems, setCartItems} = useAppContext();

  //wishhlist
  const handleWishlist = (id: any) => {
    const index = wishlist.indexOf(id);
    if (index > -1) {
      setWishlist(wishlist.filter((item: any) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };
  const renderItem = ({item}: any) => {
    return <HomeCategoryItem item={item} />;
  };
  return (
    <Box mt={4} pl={3}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Heading size={'sm'}>{title}</Heading>
          <Text fontSize={12}>Eat healthy , stay healthy</Text>
        </Box>
        <Pressable onPress={() => navigation.navigate('Category', {})}>
          <HStack alignItems={'center'} pr={3} space={1}>
            <Text fontSize={13}>See All</Text>
            <Box bg={'#4F7942'} borderRadius={20}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.textWhite}
              />
            </Box>
          </HStack>
        </Pressable>
      </HStack>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
});
