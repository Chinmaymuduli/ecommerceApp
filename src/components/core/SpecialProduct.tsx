import {Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, FlatList, HStack, Image, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import SpecialProductCard from './SpecialProductCard';

const SpecialProduct = ({data}: any) => {
  const navigation = useNavigation<NavigationProps>();
  // const [specialcartItems, setSpecialCartItems] = React.useState<any>([]);
  // const [count, setCount] = useState(0);
  // const {setCartItems, cartItems} = useAppContext();

  // const decrement = () => {
  //   if (count > 1) {
  //     setCount(count - 1);
  //     return;
  //   }
  //   setCount(0);
  // };

  // const increment = () => {
  //   setCount(count + 1);
  // };
  // const AddSpecialCart = (item: any) => {
  //   increment();
  //   setCartItems((prev: any) => [...prev, item]);
  // };
  // console.log('second', cartItems);
  const renderItem = ({item}: any) => {
    return (
      // <Box mb={5} justifyContent={'center'}>
      //   <Pressable
      //     onPress={() => navigation.navigate('ProductDetails', {})}
      //     borderWidth={1}
      //     mr={5}
      //     borderRadius={6}
      //     borderColor={COLORS.lightGrey}>
      //     <Box
      //       h={110}
      //       w={Dimensions.get('window').width / 2.4}
      //       alignItems={'center'}
      //       justifyContent={'center'}>
      //       <Image
      //         source={item?.img}
      //         style={styles.specialImg}
      //         alt={'image'}
      //         resizeMode={'contain'}
      //       />
      //     </Box>

      //     <Box pl={2}>
      //       <Text>{item?.label}</Text>
      //       <HStack space={3}>
      //         <Text>&#8377; {item?.price}</Text>
      //         <Text textDecorationLine={'line-through'} color={COLORS.cgcolor}>
      //           &#8377; {item?.discount}
      //         </Text>
      //       </HStack>
      //     </Box>

      //     <Box
      //       width={8}
      //       position={'absolute'}
      //       bg={'#4F7942'}
      //       borderTopLeftRadius={5}
      //       alignItems={'center'}
      //       borderBottomRightRadius={5}>
      //       <Text fontSize={10} flexWrap={'wrap'} color={COLORS.textWhite}>
      //         {item?.offer}
      //       </Text>
      //     </Box>
      //   </Pressable>
      //   {/* <Box
      //     alignSelf={'flex-end'}
      //     right={5}
      //     bg={COLORS.textWhite}
      //     mt={-5}
      //     shadow={1}
      //     // borderWidth={1}
      //     borderRadius={5}
      //     borderColor={COLORS.lightGrey}>
      //     <Entypo
      //       name={
      //         specialcartItems?.some((data: any) => data.id === item?.id)
      //           ? 'minus'
      //           : 'plus'
      //       }
      //       // name="plus"
      //       size={19}
      //       color={COLORS.fadeBlack}
      //       style={{
      //         paddingHorizontal: 3,
      //         paddingVertical: 3,
      //       }}
      //       onPress={() => AddSpecialCart(item)}
      //     />
      //   </Box> */}
      //   <Box
      //     alignSelf={'flex-end'}
      //     right={2}
      //     bg={COLORS.textWhite}
      //     mt={-5}
      //     shadow={1}
      //     borderRadius={5}
      //     borderColor={COLORS.lightGrey}>
      //     {cartItems?.some((data: any) => data?.id === item?.id) &&
      //     count > 0 ? (
      //       <HStack
      //         bg={'#FFFF0060'}
      //         w={'125'}
      //         justifyContent="space-between"
      //         alignItems={'center'}>
      //         <Box>
      //           <Entypo
      //             name="minus"
      //             size={20}
      //             color={COLORS.fadeBlack}
      //             onPress={() => decrement(item.id)}
      //           />
      //         </Box>
      //         <Box>
      //           <Text>{count}</Text>
      //         </Box>
      //         <Box>
      //           <Entypo
      //             name="plus"
      //             size={18}
      //             color={COLORS.fadeBlack}
      //             style={{
      //               paddingHorizontal: 3,
      //               paddingVertical: 3,
      //             }}
      //             onPress={() => setCount(count + 1)}
      //           />
      //         </Box>
      //       </HStack>
      //     ) : (
      //       <Box>
      //         <Entypo
      //           name="plus"
      //           size={18}
      //           color={COLORS.fadeBlack}
      //           style={{
      //             paddingHorizontal: 3,
      //             paddingVertical: 3,
      //           }}
      //           // onPress={() => console.log('Add Cart', item)}
      //           onPress={() => AddSpecialCart(item)}
      //         />
      //       </Box>
      //     )}
      //   </Box>
      // </Box>
      <SpecialProductCard item={item} />
    );
  };
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
          renderItem={renderItem}
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
