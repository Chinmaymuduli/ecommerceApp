import React from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import SpecialProductCard from './SpecialProductCard';
import {useSwrApi} from 'hooks';
import {useAuth} from 'app';
import {ProductType} from 'types';

const SpecialProduct = () => {
  const navigation = useNavigation<NavigationProps>();
  const {user, userType} = useAuth();

  const {data, isValidating, mutate} = useSwrApi(
    `products/featured?${
      user?._id ? `userId=${user?._id}` : ''
    }&type=${userType}&limit=10&chunk=0`,
  );

  const SpecialProductData: ProductType[] = data?.data?.data?.data;

  return (
    <Box mb={3} px={4}>
      <HStack alignItems={'center'} space={3}>
        <Box w={'24%'} h={0.5} bg={COLORS.lightGrey}></Box>
        <HStack>
          <Text fontSize={15} bold>
            Our
          </Text>
          <Text color={COLORS.secondary} fontSize={15} bold>
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
            <Box bg={'COLORS.secondary'} borderRadius={20}>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.textWhite}
              />
            </Box>
          </HStack>
        </Pressable>
      </Box>
      <Box
        mt={2}
        // ml={1}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-between'}>
        {SpecialProductData?.map((item, index) => (
          <SpecialProductCard
            item={item}
            isValidating={isValidating}
            mutate={mutate}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SpecialProduct;
