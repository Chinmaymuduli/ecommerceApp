import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  Radio,
  ScrollView,
  Stack,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useAppContext} from 'contexts';
import {ErrorModal, ImagePicker} from 'components/core';
import {getPrice} from 'utils';

type Props = NativeStackScreenProps<PrivateRoutesType, 'PaymentScreen'>;
const PaymentScreen = ({navigation, route}: Props) => {
  const paymentProductData = route.params?.PaymentData;

  // console.log('object', paymentProductData);
  const {
    TotalProductPriceWithoutDiscount,
    totalDiscountAmount,
    sumTotalPriceCustomerWillPay,
  } = getPrice(paymentProductData);

  const {userData} = useAppContext();
  const [payment, setPayment] = useState<any>();
  const [gstValue, setGstValue] = useState<any>('noGst');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>('');
  const [document, setDocument] = useState<any>('');
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [GstNumber, setGstNumber] = useState<any>();

  const handleDismiss = () => {
    setVisible(false);
  };

  const handelCancel = () => {
    setShowModal(false);
    setDocument('');
    setProfileImage('');
  };

  const ConfirmOrder = () => {
    if (profileImage && document) {
      navigation.navigate('ConfirmOrder', {
        confirmOrderData: paymentProductData,
      });
    } else if (GstNumber) {
      navigation.navigate('ConfirmOrder', {
        confirmOrderData: paymentProductData,
      });
    } else {
      setShowErrorModal(true);
    }
  };
  return (
    <Box flex={1} bg={COLORS.lightGrey}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box bg={COLORS.textWhite} pb={1}>
          <Box mt={5}>
            <Box borderBottomWidth={1} borderColor={COLORS.lightGrey} px={4}>
              <Heading size={'sm'}>Price details</Heading>
            </Box>
            <Box px={4}>
              <Box
                borderBottomWidth={1}
                borderColor={COLORS.lightGrey}
                borderBottomStyle={'dashed'}>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Price(1 items)</Text>
                  <Text>&#8377;{TotalProductPriceWithoutDiscount}</Text>
                </HStack>

                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Saving</Text>
                  <Text color={'green.500'}>
                    - &#8377;{totalDiscountAmount}
                  </Text>
                </HStack>
                <HStack
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Coupon Discount</Text>
                  <Text color={'green.500'}>- &#8377; 0</Text>
                </HStack>
                <HStack
                  mb={2}
                  pt={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text>Delivery Charges</Text>
                  <Text color={'green.500'}>free</Text>
                </HStack>
              </Box>
            </Box>
            <Box px={4} mt={2} mb={2}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text>Amount Payable</Text>
                <Text bold>&#8377;{sumTotalPriceCustomerWillPay}</Text>
              </HStack>
            </Box>
          </Box>
        </Box>
        <Box>
          <Pressable onPress={() => navigation.navigate('Coupon')}>
            <HStack
              my={2}
              bg={'#fff'}
              px={4}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <HStack alignItems={'center'} py={3} space={4}>
                <MaterialCommunityIcons
                  name="ticket-percent"
                  size={30}
                  color={COLORS.fadeBlack}
                />
                <Text fontSize={15}>Use Coupons</Text>
              </HStack>
              <Ionicons
                name="chevron-forward"
                size={25}
                color={COLORS.fadeBlack}
              />
            </HStack>
          </Pressable>
        </Box>
        <Box bg={COLORS.textWhite} px={4} flex={1}>
          <Box py={3}>
            <Heading size={'sm'}>Payment Method</Heading>
          </Box>
          <Box>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              defaultValue="payOnline"
              value={payment}
              onChange={nextValue => {
                setPayment(nextValue);
              }}>
              <Radio value="payOnline" my={1} colorScheme={'green'}>
                Pay Online
              </Radio>
              <Radio value="cod" my={3} colorScheme={'green'}>
                Cash On Delivery
              </Radio>
            </Radio.Group>
          </Box>
        </Box>
        {Boolean(userData?.role !== 'b2c') && (
          <>
            <Box bg={COLORS.textWhite} mt={2} px={4}>
              <Box
                py={3}
                borderBottomWidth={1}
                borderBottomColor={COLORS.lightGrey}>
                <Heading size={'sm'}>Upload Document</Heading>
                <Text>Please provide one Document for verification</Text>
              </Box>
              <Box py={2}>
                <Radio.Group
                  name="exampleGroup"
                  defaultValue="noGst"
                  accessibilityLabel="pick a size"
                  value={gstValue}
                  onChange={nextValue => {
                    setGstValue(nextValue);
                  }}>
                  <Stack
                    direction={{
                      base: 'row',
                      md: 'row',
                    }}
                    alignItems={{
                      base: 'flex-start',
                      md: 'center',
                    }}
                    space={8}
                    w="75%"
                    maxW="300px">
                    <Radio value="noGst" colorScheme="green" size="sm" my={1}>
                      I don't have GST
                    </Radio>

                    <Radio
                      value="gstInvoice"
                      colorScheme="green"
                      size="sm"
                      my={1}>
                      I want GST Invoice
                    </Radio>
                  </Stack>
                </Radio.Group>
                <Box mb={50}>
                  {gstValue === 'noGst' ? (
                    <Box pt={2}>
                      <Text>Please provide one Document for verification</Text>
                      <HStack space={10}>
                        <Pressable
                          w={'50%'}
                          h={10}
                          onPress={() => setShowModal(true)}
                          mt={3}
                          borderWidth={1}
                          borderColor={COLORS.lightGrey}
                          borderRadius={5}>
                          <HStack alignItems={'center'} px={2} space={3} py={2}>
                            <Text bold>
                              {document ? document : 'Choose Document'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} />
                          </HStack>
                        </Pressable>
                        <Box mt={3}>
                          <Pressable
                            onPress={() =>
                              document
                                ? setVisible(true)
                                : setShowErrorModal(true)
                            }
                            borderWidth={1}
                            borderRadius={5}
                            borderColor={COLORS.primary}>
                            <Image
                              resizeMode="cover"
                              source={{
                                uri: profileImage
                                  ? profileImage
                                  : 'https://img.freepik.com/free-vector/illustration-camera-icon_53876-5563.jpg?w=740&t=st=1655533735~exp=1655534335~hmac=2da184f3baa2ffe8fe2ea4c96b42c91d5c26cb59023e2c80c4c5ba24fe7a9338',
                              }}
                              style={{width: 100, height: 100}}
                              alt="GST_IMG"
                              borderTopRadius={5}
                            />
                            <Box
                              bg={'green.700'}
                              borderBottomRadius={4}
                              alignItems={'center'}>
                              <Text color={COLORS.textWhite}>Upload Photo</Text>
                            </Box>
                          </Pressable>
                        </Box>
                      </HStack>
                    </Box>
                  ) : (
                    <>
                      <Box mt={4}>
                        <Heading size={'xs'}>GST Number</Heading>
                        <Box
                          mt={1}
                          borderWidth={1}
                          borderColor={COLORS.lightGrey}
                          borderRadius={6}>
                          <Input
                            placeholder="Enter GST Number"
                            bgColor={COLORS.textWhite}
                            variant="unstyled"
                            borderRadius={6}
                            fontSize={15}
                            value={GstNumber}
                            onChangeText={nextValue => {
                              setGstNumber(nextValue);
                            }}
                          />
                        </Box>
                        <Box mt={2} mb={3}>
                          <Text fontSize={12} color={'blue.400'} bold>
                            * To get GST invoice and tax benefits, please
                            provide your GST Number above.
                          </Text>
                        </Box>
                      </Box>
                    </>
                  )}
                  <Box mt={4} bg={'#fee2e2'} borderRadius={4}>
                    <HStack space={3} alignItems={'center'} px={2} py={2}>
                      <Ionicons
                        name="information-circle-outline"
                        size={25}
                        color={'#ef4444'}
                      />
                      <VStack w={300}>
                        <Text fontSize={11} bold color={'#ef4444'}>
                          You must provide at least one verification document or
                          valid GST No. to successfully place the order.
                        </Text>
                        <Text fontSize={11} bold color={'#ef4444'}>
                          This is only one time process.
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </ScrollView>
      <Box w={'full'} position={'absolute'} bottom={1}>
        <Pressable
          mx={4}
          bg={'#008000'}
          borderRadius={4}
          onPress={() => {
            if (userData?.role === 'b2b') {
              return ConfirmOrder();
            }
            navigation.navigate('ConfirmOrder', {
              confirmOrderData: paymentProductData,
            });
          }}>
          <HStack justifyContent={'space-between'} py={2} alignItems={'center'}>
            <HStack alignItems={'center'} space={2} pl={2}>
              <Box>
                <Text bold color={'#fff'}>
                  1 items
                </Text>
              </Box>
              <HStack space={2}>
                <Text bold color={'#fff'}>
                  |
                </Text>
                <Text bold color={'#fff'}>
                  &#8377;
                  {/* {DiscountPrice - saving} */}
                  {sumTotalPriceCustomerWillPay}
                </Text>
                <Text textDecorationLine={'line-through'} color={'#fff'}>
                  &#8377;
                  {/* {DiscountPrice} */}
                  {TotalProductPriceWithoutDiscount}
                </Text>
              </HStack>
            </HStack>
            <HStack space={2} alignItems={'center'}>
              <Text bold color={'#fff'}>
                Confirm Order
              </Text>
              <Ionicons name="chevron-forward" size={25} color={'#fff'} />
            </HStack>
          </HStack>
        </Pressable>
      </Box>
      {/* Modal */}
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Choose Documents</Modal.Header>
            <Modal.Body>
              <Radio.Group
                defaultValue="Bill Book"
                name="myRadioGroup"
                value={document}
                onChange={nextValue => {
                  setDocument(nextValue);
                }}
                accessibilityLabel="Pick your favorite number">
                <Radio value="Bill Book" my={4}>
                  Bill Book
                </Radio>
                <Divider />
                <Radio value="Visiting Card" my={4} size={'md'}>
                  Visiting Card
                </Radio>
                <Divider />
                <Radio value="Shop Photo" my={4}>
                  Shop Photo
                </Radio>
                <Divider />
              </Radio.Group>
              <Box px={5} mt={3}>
                <HStack justifyContent={'space-between'}>
                  <Pressable
                    onPress={handelCancel}
                    borderWidth={1}
                    borderColor={'red.800'}
                    borderRadius={5}>
                    <Text color={'red.800'} bold px={4} py={1}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setShowModal(false)}
                    borderWidth={1}
                    borderColor={COLORS.primary}
                    borderRadius={5}>
                    <Text
                      color={COLORS.primary}
                      bold
                      fontSize={16}
                      px={4}
                      py={1}>
                      Done
                    </Text>
                  </Pressable>
                </HStack>
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
      {/* Image Picker */}
      <ImagePicker
        visible={visible}
        onDismiss={handleDismiss}
        setImageURI={setProfileImage}
        cropperCircleOverlay={true}
        postImages={false}
      />
      {/* Error Modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label="Please select at least one document."
      />
    </Box>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
