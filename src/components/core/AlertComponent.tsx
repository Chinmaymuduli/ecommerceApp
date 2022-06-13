import {StyleSheet} from 'react-native';
import React from 'react';
import {Alert, Box, HStack, Text, VStack} from 'native-base';

const AlertComponent = ({openAlert, alertMessage}: any) => {
  return (
    <>
      {openAlert ? (
        <Box position={'absolute'} top={4} width={'full'} px={2}>
          <Alert
            w="100%"
            variant={'subtle'}
            colorScheme="success"
            status="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="center">
                <HStack
                  space={2}
                  flexShrink={1}
                  alignItems="center"
                  justifyContent={'center'}>
                  <Alert.Icon />
                  <Text color={'coolGray.800'}>{alertMessage}</Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        </Box>
      ) : null}
    </>
  );
};

export default AlertComponent;

const styles = StyleSheet.create({});
