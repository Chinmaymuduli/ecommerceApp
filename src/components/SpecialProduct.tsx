import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, FlatList, HStack, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import SpecialProductCard from './SpecialProductCard';
import {HomeProductType, ProductDetailsType} from 'types';

type Props = {
  data: HomeProductType[];
};

const SpecialProduct = ({data}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <Box mb={3} px={4}>
      <HStack alignItems={'center'} space={3}>
        <Box w={'24%'} h={0.5} bg={COLORS.lightGrey}></Box>
        <HStack>
          <Text fontSize={15} bold>
            Our
          </Text>
          <Text color={'#4F7942'} fontSize={15} bold>
            {' '}
            Special
          </Text>
          <Text fontSize={15} bold>
            {' '}
            Products
          </Text>
        </HStack>
        <Box w={'25%'} h={0.5} bg={COLORS.lightGrey}></Box>
      </HStack>
      <Box alignSelf={'flex-end'} py={1}>
        <Pressable onPress={() => navigation.navigate('Category', {})}>
          <HStack alignItems={'center'} pr={2} space={1}>
            <Text fontSize={13} bold>
              See All
            </Text>
            <Box bg={'#4F7942'} borderRadius={20}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.textWhite}
              />
            </Box>
          </HStack>
        </Pressable>
      </Box>
      <Box mt={2}>
        <FlatList
          data={data}
          renderItem={({item}) => <SpecialProductCard item={item} />}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
        />
      </Box>
    </Box>
  );
};

export default SpecialProduct;

const styles = StyleSheet.create({
  // specialImg: {
  //   width: 100,
  //   height: 100,
  // },
});