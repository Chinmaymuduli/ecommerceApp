import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const B2bDocument = () => {
  return (
    <Box px={5}>
      <Text>Please select one document for verification</Text>
      <Pressable
        w={'100%'}
        h={10}
        //   onPress={() => setShowModal(true)}
        mt={3}
        borderWidth={1}
        borderColor={COLORS.lightGrey}
        borderRadius={5}>
        <HStack
          alignItems={'center'}
          px={2}
          space={3}
          py={2}
          justifyContent={'space-between'}>
          <Text bold>
            {/* {document ? document : 'Choose Document'} */}
            Choose Document
          </Text>
          <Ionicons name="chevron-down" size={20} />
        </HStack>
      </Pressable>
    </Box>
  );
};

export default B2bDocument;

const styles = StyleSheet.create({});
