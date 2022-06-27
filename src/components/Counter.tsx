import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import Entypo from 'react-native-vector-icons/Entypo';

const Counter = () => {
  return (
    <>
      <Box
        alignSelf={'flex-end'}
        right={2}
        bg={COLORS.textWhite}
        mt={-5}
        shadow={1}
        borderRadius={5}
        borderColor={COLORS.lightGrey}>
        {cartItems?.some((data: any) => data?.product?.id === item?.id) &&
        count > 0 ? (
          <HStack
            bg={'#FFFF0060'}
            w={'125'}
            justifyContent="space-between"
            alignItems={'center'}>
            <Box>
              <Entypo
                name="minus"
                size={20}
                color={COLORS.fadeBlack}
                // onPress={() => decrement(item.id)}
              />
            </Box>
            <Box>
              <Text>{/* {count} */}</Text>
            </Box>
            <Box>
              <Entypo
                name="plus"
                size={18}
                color={COLORS.fadeBlack}
                style={{
                  paddingHorizontal: 3,
                  paddingVertical: 3,
                }}
                //   onPress={() => increment(item.id)}
              />
            </Box>
          </HStack>
        ) : (
          <Box>
            <Entypo
              name="plus"
              size={18}
              color={COLORS.fadeBlack}
              style={{
                paddingHorizontal: 3,
                paddingVertical: 3,
              }}
              // onPress={() => console.log('Add Cart', item)}
              onPress={() => addtoCartItem(item)}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Counter;

const styles = StyleSheet.create({});
