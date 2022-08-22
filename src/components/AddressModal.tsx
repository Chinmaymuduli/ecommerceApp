import React, {useState} from 'react';
import {Box, Heading, HStack, Modal, Pressable, Radio, Text} from 'native-base';
import {COLORS} from 'configs';
import {useIsMounted, useSwrApi} from 'hooks';
import {post} from 'api';

type Props = {
  addressModal: boolean;
  setAddressModal: (previous: boolean) => void;
  setModalDialog: (data: boolean) => void;
  // setAddressValue: (address: string) => void;
  // addressValue: string;
  productId: string;
  quantity: number;
  setShowErrorModal: (error: boolean) => void;
  setLabel: (label: string) => void;
};

export default function AddressModal({
  addressModal,
  setAddressModal,
  setModalDialog,
  // setAddressValue,
  // addressValue,
  setShowErrorModal,
  setLabel,
  productId,
  quantity,
}: Props) {
  const [addressValue, setAddressValue] = useState<string>();
  const {data} = useSwrApi('address/all/my-addresses');
  const modalAddressData = data?.data?.data;
  const isMounted = useIsMounted();
  const handelAddress = async () => {
    // isMounted.current && setAddressModal(false);
    // isMounted.current && setModalDialog(true);
    setAddressModal(false);
    try {
      const res = await post({
        path: 'order/bulk',
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
          shippedTo: addressValue,
        }),
      });
      console.log({res});
      // setModalDialog(false);
      if (res.status === 200) return setModalDialog(true);
      return setShowErrorModal(true), setLabel(res.error);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        isOpen={addressModal}
        onClose={() => setAddressModal(false)}
        safeAreaTop={true}>
        <Modal.Content width={'full'}>
          <Modal.Body>
            <Box
              mb={3}
              borderBottomWidth={1}
              borderStyle={'dashed'}
              borderColor={COLORS.primary}>
              <Heading size={'sm'} py={2}>
                Select Your Address
              </Heading>
            </Box>
            {modalAddressData?.map(
              (item: {
                _id: string;
                name:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                type:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                landmark:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                street:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                city:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                state:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                zip:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
                phoneNumber:
                  | boolean
                  | React.ReactChild
                  | React.ReactFragment
                  | React.ReactPortal
                  | null
                  | undefined;
              }) => (
                <Radio.Group
                  key={item?._id}
                  name="myRadioGroup"
                  value={addressValue}
                  onChange={nextValue => {
                    setAddressValue(nextValue);
                  }}
                  defaultValue={modalAddressData[0]._id}
                  accessibilityLabel="Select address">
                  <Radio value={item?._id} my={4} mx={2} colorScheme="green">
                    <Box pb={3}>
                      <HStack space={2}>
                        <Text bold>{item?.name}</Text>
                        <Box bg={'green.100'} borderRadius={5}>
                          <Text px={2}>{item.type}</Text>
                        </Box>
                      </HStack>
                      <Text flexWrap={'wrap'} mt={2} w={300}>
                        {item?.landmark} {item?.street} {item?.city}{' '}
                        {item?.state} {item?.zip}
                      </Text>
                      <Text mt={2} bold>
                        {item?.phoneNumber}
                      </Text>
                    </Box>
                  </Radio>
                </Radio.Group>
              ),
            )}
            <Pressable alignItems={'center'} onPress={() => handelAddress()}>
              <Box
                mt={5}
                borderWidth={2}
                borderRadius={5}
                borderColor={'green.600'}>
                <Text
                  textAlign={'center'}
                  fontSize={18}
                  bold
                  px={10}
                  color={'green.600'}>
                  OK
                </Text>
              </Box>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
