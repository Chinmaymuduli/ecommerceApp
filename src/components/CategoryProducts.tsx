import React from 'react';
import {
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import HomeCategoryItem from './HomeCategoryItem';
import {HomeProductType, ProductType} from 'types';
import {useSwrApi} from 'hooks';

type CategoryProductType = {
  title?: string;
  // data?: HomeProductType[];
  image?: string | any;
  label?: string;
  discount?: string;
  price?: string;
  setOpenAlert?: any;
  setAlertMessage?: any;
  item?: any;
};

const CategoryProducts = ({
  // title,
  // data,
  setOpenAlert,
  setAlertMessage,
  item,
}: CategoryProductType) => {
  const navigation = useNavigation<NavigationProps>();

  const {data} = useSwrApi(`category/${item?._id}/products`);

  const CategoryProductData: ProductType[] = data?.data?.data?.data;

  return (
    <>
      <Box mt={4} pl={3}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Heading size={'sm'}>{item?.name}</Heading>
            <Text fontSize={12}>Eat healthy , stay healthy</Text>
          </Box>
          <Pressable onPress={() => navigation.navigate('Category', {})}>
            <HStack alignItems={'center'} pr={3} space={1}>
              <Text fontSize={13}>See All</Text>
              <Box bg={'COLORS.secondary'} borderRadius={20}>
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
          data={CategoryProductData}
          renderItem={({item}) => (
            <HomeCategoryItem
              item={item}
              setOpenAlert={setOpenAlert}
              setAlertMessage={setAlertMessage}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Box mt={5}>
              <Heading size={'sm'} color={COLORS.primary} textAlign={'center'}>
                No Products Found
              </Heading>
            </Box>
          }
        />
      </Box>
    </>
  );
};

export default CategoryProducts;
