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
import {useAccessToken, useIsMounted} from 'hooks';
import {CategoryType} from 'types';

const HomeCategories = () => {
  const {category} = useStore();
  const navigation = useNavigation<NavigationProps>();
  const {accessToken} = useAccessToken();
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [categoryData, setCategoryData] = useState<CategoryType[]>();
  const CategoryRes = async () => {
    try {
      isMounted.current && setIsLoading(true);
      const Response = await GET({
        path: 'categories',
        token: accessToken,
      });
      // console.log(Response.data);
      setCategoryData(Response.data);
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setIsLoading(false);
    }
  };
  useEffect(() => {
    CategoryRes();
  }, []);
  // console.log({categoryData});
  return (
    <>
      <Box mt={5} pl={3}>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <Heading size={'md'}>Categories</Heading>
          <Pressable pr={3} onPress={() => navigation.navigate('Category', {})}>
            <Text bold color={COLORS.cgcolor}>
              View All
            </Text>
          </Pressable>
        </HStack>
        <FlatList
          // data={category}
          data={categoryData}
          renderItem={({item}) => <HomeCategoriesItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  imagestyle: {
    width: 70,
    height: 70,
    // borderColor: COLORS.textWhite,
    borderRadius: 40,
  },
});
