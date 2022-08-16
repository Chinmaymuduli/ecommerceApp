import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Heading, Input, Text} from 'native-base';
import {COLORS} from 'configs';

const GstComponent = () => {
  return (
    <Box px={5} py={5}>
      <Text fontSize={15} bold>
        GST Number
      </Text>
      <Input placeholder="Enter GST no." borderWidth={2} mt={2} fontSize={15} />
      <Text color={COLORS.secondary} fontSize={12} mt={3}>
        *To get GST invoice and tax benefits, please provide your GST Number
        above.
      </Text>

      <Box bg={COLORS.primary} borderRadius={5} mt={6}>
        <Text textAlign={'center'} color={COLORS.textWhite} bold py={1.5}>
          SAVE GST NUMBER
        </Text>
      </Box>
    </Box>
  );
};

export default GstComponent;

const styles = StyleSheet.create({});
