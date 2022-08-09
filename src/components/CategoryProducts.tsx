import {Box, FlatList, Heading, HStack, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HomeCategoryItem from './HomeCategoryItem';
import {ProductType} from 'types';
import {useIsMounted, useSwrApi} from 'hooks';
import {COLORS} from 'configs';
import React, {useEffect} from 'react';
import {useAuth} from 'app';
import {FetchLoader} from './core';

type CategoryProductType = {
  title?: string;
  image?: string | any;
  label?: string;
  discount?: string;
  price?: string;
  setOpenAlert?: any;
  setAlertMessage?: any;
  item?: any;
};

const CategoryProducts = ({
  setOpenAlert,
  setAlertMessage,
  item,
}: CategoryProductType) => {
  const navigation = useNavigation<NavigationProps>();
  const {user} = useAuth(state => state);
  const isMounted = useIsMounted();

  const {data, mutate, isLoading, isValidating} = useSwrApi(
    user?._id
      ? `category/${item?._id}/products?userId=${user?._id}`
      : `category/${item?._id}/products`,
  );

  const CategoryProductData: ProductType[] = data?.data?.data?.data;

  const isFocused = useIsFocused();

  useEffect(() => {
    isMounted.current && mutate();
  }, [isFocused]);

  return (
    <>
      {/* {ProductLoading ? (
        <FetchLoader />
      ) : ( */}
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
              ProductMutate={mutate}
              isValidating={isValidating}
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
      {/* )} */}
    </>
  );
};

export default CategoryProducts;
