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
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {COLORS} from 'configs';
import HomeCategoriesItem from './HomeCategoriesItem';
import {useStore} from '../../src/app';
import {GET} from 'api';
import {useAuthFetch, useIsMounted, useSwrApi} from 'hooks';
import {CategoryType} from 'types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CategorySkeleton} from 'src/skeleton';

const HomeCategories = () => {
  const navigation = useNavigation<NavigationProps>();
  const [CategoryData, setCategoryData] = useState<CategoryType[]>();
  const isMounted = useIsMounted();
  const {data, isValidating} = useSwrApi('categories?limit=5&chunk=0');
  useEffect(() => {
    isMounted.current && setCategoryData(data?.data?.data);
  }, [data]);

  return (
    <>
      <Box mt={5} pl={3}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Heading size={'md'}>Categories</Heading>
          <Pressable pr={3} onPress={() => navigation.navigate('Category', {})}>
            <Text bold color={COLORS.primary}>
              View All
            </Text>
          </Pressable>
        </HStack>
        <FlatList
          data={CategoryData}
          renderItem={({item}) => (
            <HomeCategoriesItem item={item} isLoading={isValidating} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </>
  );
};

export default HomeCategories;
