import {Box, FlatList, Heading, HStack, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HomeCategoryItem from './HomeCategoryItem';
import {ProductType} from 'types';
import {useIsMounted, useSwrApi} from 'hooks';
import {COLORS} from 'configs';
import React, {useEffect, useState} from 'react';
import {useAuth} from 'app';
import {ProductSkeleton} from '../../src/skeleton';

type CategoryProductType = {
  title?: string;
  image?: string;
  label?: string;
  discount?: string;
  price?: string;
  setOpenAlert: (previousValue: boolean) => void;
  setAlertMessage: (txt: string) => void;
  item?: {
    _id?: string;
    name?: string;
    description?: string;
  };
};

const CategoryProducts = ({
  setOpenAlert,
  setAlertMessage,
  item,
}: CategoryProductType) => {
  const navigation = useNavigation<NavigationProps>();
  const {user, userType} = useAuth(state => state);
  const [CategoryProductData, setCategoryProductData] =
    useState<ProductType[]>();
  const isMounted = useIsMounted();

  const {data, mutate, isValidating} = useSwrApi(
    user?._id
      ? `category/${item?._id}/products?userId=${user?._id}&type=${userType}`
      : `category/${item?._id}/products?type=${userType}`,
  );

  const isFocused = useIsFocused();

  useEffect(() => {
    isMounted.current && setCategoryProductData(data?.data?.data?.data);
  }, [isFocused, data]);

  if (isValidating && !data) return <ProductSkeleton />;

  return (
    <>
      <Box mt={4} pl={3}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Heading size={'sm'}>{item?.name}</Heading>
            <Text fontSize={12}>{item?.description}</Text>
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
            <>
              {!data && (
                <Box mt={5}>
                  <Heading
                    size={'sm'}
                    color={COLORS.primary}
                    textAlign={'center'}>
                    No Products Found
                  </Heading>
                </Box>
              )}
            </>
          }
        />
      </Box>
    </>
  );
};

export default CategoryProducts;
