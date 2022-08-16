import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {COLORS} from 'configs';
import {GstComponent} from 'components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const B2BAccount = () => {
  return (
    <Box safeAreaTop flex={1} bg={COLORS.textWhite}>
      {/* <GstComponent /> */}
      <Box bg={COLORS.primary}>
        <HStack space={4} alignItems={'center'} py={3} px={5}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
          <Text color={COLORS.textWhite} fontSize={17} bold>
            Account Details
          </Text>
        </HStack>
      </Box>
      <GstComponent />
    </Box>
  );
};

export default B2BAccount;

const styles = StyleSheet.create({});
