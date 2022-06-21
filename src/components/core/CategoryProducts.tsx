import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, FlatList, Heading, HStack, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import HomeCategoryItem from './HomeCategoryItem';

type CategoryProductType = {
  title?: string;
  data?: any;
  image?: string | any;
  label?: string;
  discount?: string;
  price?: string;
  setOpenAlert?: any;
  setAlertMessage?: any;
};

const CategoryProducts = ({
  title,
  data,
  setOpenAlert,
  setAlertMessage,
}: CategoryProductType) => {
  const navigation = useNavigation<NavigationProps>();

  const renderItem = ({item}: any) => {
    return (
      <HomeCategoryItem
        item={item}
        setOpenAlert={setOpenAlert}
        setAlertMessage={setAlertMessage}
      />
    );
  };
  return (
    <>
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
    </>
  );
};

export default CategoryProducts;
