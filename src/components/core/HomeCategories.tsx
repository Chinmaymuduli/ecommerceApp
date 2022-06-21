import {StyleSheet} from 'react-native';
import React from 'react';
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
import {CATEGORYARR} from '../../constants';
import HomeCategoriesItem from '../HomeCategoriesItem';

const HomeCategories = ({item}: any) => {
  const navigation = useNavigation<NavigationProps>();

  const renderItem = ({item}: any) => {
    return <HomeCategoriesItem item={item} />;
  };
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
          data={CATEGORYARR}
          renderItem={renderItem}
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
