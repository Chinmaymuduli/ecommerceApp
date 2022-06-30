import React from 'react';
import {Box, HStack, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from 'configs';
import {useStore} from 'app';

type Props = {
  orderQuantity: number;
  productID: number;
};

const OrderSummaryCounter = ({orderQuantity, productID}: Props) => {
  const {updateQuantity} = useStore(state => state);
  const decreaseItem = () => {
    updateQuantity(productID, orderQuantity - 1);
  };
  const increment = () => {
    updateQuantity(productID, orderQuantity + 1);
  };
  return (
    <>
      <Box mt={1} bg={'#e4e4e460'} justifyContent={'center'} borderRadius={6}>
        <HStack space={5}>
          <Box bg={'green.600'} borderRadius={15}>
            <AntDesign
              name="minus"
              size={20}
              color={COLORS.textWhite}
              style={{
                padding: 2,
              }}
              onPress={() => decreaseItem()}
            />
          </Box>
          <Box>
            <Text bold>{orderQuantity}</Text>
          </Box>
          <Box bg={'green.600'} borderRadius={15}>
            <AntDesign
              style={{
                padding: 2,
              }}
              name="plus"
              size={20}
              color={COLORS.textWhite}
              onPress={increment}
            />
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default OrderSummaryCounter;
