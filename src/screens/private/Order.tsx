import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Center, Heading, Image} from 'native-base';
import {NOORDER} from 'assets';
import {COLORS} from 'configs';

const Order = () => {
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Center height={500}>
        <Image
          alt="no order"
          source={NOORDER}
          style={{
            height: 250,
            width: 250,
          }}
        />
        <Heading>You have no past orders</Heading>
        <Text>Let's get you started</Text>
      </Center>
    </Box>
  );
};

export default Order;

const styles = StyleSheet.create({});
