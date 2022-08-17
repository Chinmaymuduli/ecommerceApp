import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Heading, Input, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';

import {useIsMounted, useSwrApi} from 'hooks';
import {ErrorModal, FetchLoader} from './core';
import {put} from 'api';

const GstComponent = () => {
  const [gstNumber, setGstNumber] = useState<string>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState('');
  const isMounted = useIsMounted();

  const {data, isValidating, mutate} = useSwrApi('user/my-account');
  const userData = data?.data?.data;
  // console.log({userData});
  const handelGst = async () => {
    try {
      if (!gstNumber)
        return setShowErrorModal(true), setLabel('GST Number Required');

      const response = await put({
        path: 'user/account',
        body: JSON.stringify({
          GSTNumber: gstNumber,
        }),
      });
      console.log({response});
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  useEffect(() => {
    isMounted.current && setGstNumber(userData?.GSTNumber);
  }, [userData]);
  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box px={5} py={5}>
          <Text fontSize={15} bold>
            GST Number
          </Text>
          <Box>
            <Input
              placeholder="Enter GST no."
              borderWidth={2}
              mt={2}
              fontSize={15}
              value={gstNumber}
              onChangeText={gn => setGstNumber(gn)}
              bgColor={COLORS.textWhite}
            />
          </Box>
          <Text color={COLORS.secondary} fontSize={12} mt={3}>
            *To get GST invoice and tax benefits, please provide your GST Number
            above.
          </Text>

          <Pressable onPress={() => handelGst()}>
            <Box bg={COLORS.primary} borderRadius={5} mt={6}>
              <Text textAlign={'center'} color={COLORS.textWhite} bold py={1.5}>
                SAVE GST NUMBER
              </Text>
            </Box>
          </Pressable>
          <ErrorModal
            setShowErrorModal={setShowErrorModal}
            label={label}
            showErrorModal={showErrorModal}
          />
        </Box>
      )}
    </>
  );
};

export default GstComponent;

const styles = StyleSheet.create({});
