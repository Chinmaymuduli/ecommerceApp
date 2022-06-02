import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
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
  const renderItem = ({item}: any) => {
    return (
      <Box mt={3} overflow={'hidden'} mb={5}>
        <Pressable onPress={() => navigation.navigate('ProductDetails', item)}>
          <Box
            h={120}
            w={120}
            borderWidth={1}
            mr={3}
            alignItems={'center'}
            borderColor={COLORS.lightGrey}
            borderRadius={5}>
            <Image
              alt="image"
              source={item?.img}
              style={styles.image}
              resizeMode={'contain'}
            />
          </Box>
          <Box
            width={8}
            position={'absolute'}
            bg={'#4F7942'}
            borderTopLeftRadius={5}
            borderBottomRightRadius={5}>
            <Text
              fontSize={10}
              flexWrap={'wrap'}
              px={1}
              color={COLORS.textWhite}>
              {item?.offer}
            </Text>
          </Box>
          <Box
            // mt={1}
            position={'absolute'}
            right={4}
            borderRadius={10}>
            <Ionicons
              onPress={() => console.log('hello')}
              name="heart-outline"
              size={22}
              color={COLORS.cgcolor}
              style={{
                paddingHorizontal: 2,
                paddingVertical: 2,
              }}
            />
          </Box>
          <Box
            alignSelf={'flex-end'}
            right={2}
            bg={COLORS.textWhite}
            mt={-5}
            shadow={1}
            // borderWidth={1}
            borderRadius={5}
            borderColor={COLORS.lightGrey}>
            <Entypo
              name="plus"
              size={18}
              color={COLORS.fadeBlack}
              style={{
                paddingHorizontal: 3,
                paddingVertical: 3,
              }}
              onPress={() => console.log('Add Cart', item)}
            />
          </Box>
          <Box w={120}>
            <Text bold fontSize={12} numberOfLines={1}>
              {item?.label}
            </Text>
            <HStack space={2}>
              <Text fontSize={13}>&#8377;{item?.price}</Text>
              <Text fontSize={13} textDecorationLine={'line-through'}>
                &#8377;{item?.discount}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };
  return (
    <Box mt={4} pl={3}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Heading size={'sm'}>{title}</Heading>
          <Text fontSize={12}>Eat healthy , stay healthy</Text>
        </Box>
        <Pressable onPress={() => navigation.navigate('Category')}>
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
