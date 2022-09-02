import {Alert, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AlertDialog,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  Radio,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {PRODUCT_PLACEHOLDER} from 'assets';
import {
  FetchLoader,
  ModalComponent,
  SuccessVerificationModal,
  Track,
} from 'components/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useActions, useIsMounted, useSwrApi} from 'hooks';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import {BASE_URL, post, put, remove} from 'api';
import {useAuth} from 'app';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ProductType} from 'types';

type Props = NativeStackScreenProps<PrivateRoutesType, 'OrderDetails'>;
const OrderDetails = ({route: {params}}: Props) => {
  const orderID = params?.orderId;
  const {data, isValidating, mutate} = useSwrApi(`order/${orderID}`);
  const {user} = useAuth();
  const [showModalComponent, setShowModalComponent] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<string>('COD');
  const [OrderDetailsData, setOrderDetailsData] = useState<any>();
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = React.useState(false);
  const {setLoading, loading} = useActions();

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  useEffect(() => {
    isMounted.current && setOrderDetailsData(data?.data?.data);
  }, [data]);

  const handelPayment = async () => {
    try {
      isMounted.current && setShowModalComponent(false);
      if (paymentMethod === 'Online') {
        const b2bRes = await post({
          path: `order/bulk/payment/${OrderDetailsData?._id}`,
        });
        console.log({b2bRes});
        if (b2bRes.status === 200) {
          const options = {
            description: 'Chhattisgarh Herbals',
            currency: 'INR',
            key: 'rzp_test_LVpIWeJeXjNeF2', // Your api key
            amount: b2bRes?.data?.amount,
            name: user?.displayName,
            order_id: b2bRes?.data?.id,
            prefill: {
              email: user?.email || 'chinmaymuduli1996@gmail.com',
              contact: user?.phoneNumber,
              name: user?.displayName,
            },
          };
          RazorpayCheckout.open(options)
            .then(async (data: any) => {
              console.log({data});
              const res = await post({
                path: `order/bulk/payment/${OrderDetailsData?._id}/verify`,
                body: JSON.stringify({
                  razorpay_payment_id: data?.razorpay_payment_id,
                  razorpay_order_id: data?.razorpay_order_id,
                  razorpay_signature: data?.razorpay_signature,
                  payment_order_id: b2bRes?.data?.id,
                  paymentMethod: 'ONLINE',
                }),
              });
              console.log({res});
              if (res.status === 200) {
                Alert.alert('Success', 'Successfully payment');
                mutate();
              } else {
                Alert.alert('Error', res.error);
                mutate();
              }
            })
            .catch((error: any) => {
              console.log(error);
              Alert.alert('Error', 'Transaction Failed');
            });
        }
      } else {
        const codRes = await post({
          path: `order/bulk/payment/${OrderDetailsData?._id}/verify`,
          body: JSON.stringify({
            paymentMethod: 'COD',
          }),
        });
        if (codRes.status === 200) {
          Alert.alert('Success', 'Order Placed Successfully');
          mutate();
        } else {
          Alert.alert('Error', codRes.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeInvoice = async () => {
    await remove({
      path: `invoice/${orderID}`,
    });
  };
  const handelInvoice = async () => {
    try {
      const getAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const {config, fs} = RNFetchBlob;
      let DOCUMENT_DIR = fs.dirs.DownloadDir;
      let Download_Url = `${BASE_URL}/invoice/${orderID}`;
      let ext: any = getExtention(Download_Url);
      ext = '.' + ext[0];
      let date = new Date();
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Invoice Details',
          path:
            DOCUMENT_DIR +
            '/Download' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Downloading..',
        },
      };
      config(options)
        .fetch('GET', Download_Url, {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        })
        .then(res => {
          console.log({res});
          let status = res.info().status;
          if (status === 401) {
            Alert.alert(
              'Something went wrong',
              'Please try again after sometimes',
            );
            // GetToken();
          } else {
            console.log('The File Saved To ', res.path());
            isMounted.current && setShowSuccessModal(true);
            isMounted.current &&
              setSuccessMessage('File Downloaded Successfully !');
            removeInvoice();
          }
        })

        .catch(err => {
          console.log('Err', err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getExtention = (filename: string) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const handelCancelOrder = async () => {
    try {
      onClose();
      isMounted.current && setLoading(true);
      const cancelRes = await put({
        path: `order/${OrderDetailsData?._id}/cancel`,
      });

      if (cancelRes?.status === 200) {
        mutate();
        isMounted.current && setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({OrderDetailsData});
  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isValidating}
                onRefresh={() => mutate()}
              />
            }>
            <Box>
              <Box
                borderBottomWidth={1}
                px={5}
                borderBottomColor={COLORS.lightGrey}>
                <Text letterSpacing={1} color={'gray.500'} py={3}>
                  Order ID - {OrderDetailsData?._id}
                </Text>
              </Box>
              <Box borderBottomWidth={3} borderColor={COLORS.lightGrey}>
                <HStack px={5} pt={5}>
                  <VStack space={1} w={'70%'}>
                    <Heading size={'sm'} flexWrap={'wrap'}>
                      {OrderDetailsData?.product?.title}
                    </Heading>
                    <Text color={'gray.500'}>
                      {OrderDetailsData?.quantity} Items
                    </Text>
                    <Text color={'gray.500'}>
                      Seller : {OrderDetailsData?.shippedFrom?.name}
                    </Text>
                    <Text bold fontSize={16}>
                      &#8377; {OrderDetailsData?.totalPrice}
                    </Text>
                  </VStack>
                  <Box w={'30%'}>
                    <Image
                      source={
                        OrderDetailsData?.product?.displayImage?.url
                          ? {uri: OrderDetailsData?.product?.displayImage?.url}
                          : PRODUCT_PLACEHOLDER
                      }
                      style={styles.image}
                      alt={'detailsImg'}
                      resizeMode="contain"
                      bg={'green.50'}
                      borderRadius={4}
                    />
                  </Box>
                </HStack>
                {OrderDetailsData?.status === 'INITIATED' && (
                  <Pressable
                    onPress={() => setIsOpen(!isOpen)}
                    borderWidth={1}
                    alignSelf={'flex-start'}
                    mx={4}
                    borderColor={'red.400'}
                    borderRadius={5}
                    my={3}>
                    <Text px={3} py={1} bold color={'red.400'}>
                      Cancel Order
                    </Text>
                  </Pressable>
                )}
              </Box>
              {OrderDetailsData?.status !== 'PENDING' && (
                <Box borderBottomWidth={3} borderColor={COLORS.lightGrey}>
                  <Track track={OrderDetailsData} />
                </Box>
              )}

              {/* B2B Payment */}
              {OrderDetailsData?.status === 'PENDING' &&
                OrderDetailsData?.totalPrice > 0 && (
                  <Pressable
                    onPress={() => {
                      isMounted.current && setShowModalComponent(true);
                    }}
                    px={5}
                    borderBottomWidth={3}
                    borderColor={COLORS.lightGrey}>
                    <Box
                      borderRadius={5}
                      bg={COLORS.primary}
                      alignItems={'center'}
                      w={100}
                      my={2}>
                      <Text
                        color={COLORS.textWhite}
                        bold
                        py={2}
                        letterSpacing={1}>
                        Pay Now
                      </Text>
                    </Box>
                  </Pressable>
                )}

              {OrderDetailsData?.status === 'DELIVERED' && (
                <Pressable onPress={() => handelInvoice()}>
                  <HStack
                    justifyContent={'space-between'}
                    py={4}
                    px={5}
                    borderColor={COLORS.lightGrey}
                    borderBottomWidth={3}>
                    <HStack space={3}>
                      <FontAwesome
                        name="file-text"
                        size={20}
                        color={COLORS.primary}
                      />
                      <Text bold>Invoice Download</Text>
                    </HStack>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={COLORS.fadeBlack}
                    />
                  </HStack>
                </Pressable>
              )}

              <Box borderBottomWidth={1} borderColor={COLORS.lightGrey} px={5}>
                <Text py={3} color={'gray.400'} bold>
                  Shipping Details
                </Text>
              </Box>
              <Box
                px={5}
                pb={3}
                borderBottomWidth={4}
                borderColor={COLORS.lightGrey}>
                <Heading size={'sm'} py={2}>
                  {OrderDetailsData?.shippedTo?.name}
                </Heading>
                <Text>
                  {OrderDetailsData?.shippedTo?.street},
                  {OrderDetailsData?.shippedTo?.city}
                </Text>
                <Text>{OrderDetailsData?.shippedTo?.landmark}</Text>
                <Text>
                  {OrderDetailsData?.shippedTo?.state} -{' '}
                  {OrderDetailsData?.shippedTo?.zip}
                </Text>
                <Text>
                  Phone Number: {OrderDetailsData?.shippedTo?.phoneNumber}
                </Text>
              </Box>
              <Box borderBottomWidth={1} borderColor={COLORS.lightGrey}>
                <Box
                  borderBottomWidth={1}
                  borderColor={COLORS.lightGrey}
                  px={5}>
                  <Text py={3} color={'gray.400'} bold>
                    Price Details
                  </Text>
                </Box>
                <Box px={5}>
                  <VStack
                    space={3}
                    py={3}
                    borderBottomWidth={1}
                    borderStyle={'dashed'}>
                    <HStack justifyContent={'space-between'}>
                      <Text>List Price</Text>
                      <Text textDecorationLine={'line-through'}>
                        &#8377;
                        {OrderDetailsData?.product?.mrp *
                          OrderDetailsData?.quantity}
                      </Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <Text>Selling Price</Text>
                      <Text>
                        &#8377;
                        {OrderDetailsData?.totalPrice}
                      </Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <Text>Discount</Text>
                      <Text>- &#8377;0</Text>
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                      <Text>Shipping Fee</Text>
                      <Text color={'green.500'}>
                        {OrderDetailsData?.billing?.deliveryCharge > 0
                          ? OrderDetailsData?.billing?.deliveryCharge
                          : 'free'}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
                <Box px={5} borderColor={COLORS.lightGrey}>
                  <HStack justifyContent={'space-between'} py={2}>
                    <Text bold>Total Amount</Text>
                    <Text bold>
                      &#8377;{' '}
                      {OrderDetailsData?.billing?.orders?.length > 1
                        ? OrderDetailsData?.totalPrice
                        : OrderDetailsData?.billing?.totalPrice}
                    </Text>
                    {/* <Text bold>&#8377; {OrderDetailsData?.totalPrice}</Text> */}
                  </HStack>
                </Box>
              </Box>
              {OrderDetailsData?.billing?.paymentMethod && (
                <Box px={5}>
                  <HStack py={2} space={3}>
                    <Octicons
                      name="dot-fill"
                      size={20}
                      color={COLORS.fadeBlack}
                    />
                    <HStack alignItems={'center'} space={2}>
                      <Text>{OrderDetailsData?.billing?.paymentMethod} :</Text>
                      <Text>
                        &#8377;
                        {/* {OrderDetailsData?.totalPrice} */}
                        {OrderDetailsData?.billing?.orders?.length > 1
                          ? OrderDetailsData?.totalPrice
                          : OrderDetailsData?.billing?.totalPrice}
                      </Text>
                    </HStack>
                  </HStack>
                </Box>
              )}
            </Box>
          </ScrollView>
        </Box>
      )}

      {/* Modal Component */}
      <ModalComponent
        title="Select Payment"
        showModalComponent={showModalComponent}
        setShowModalComponent={setShowModalComponent}>
        <>
          <Radio.Group
            name="payment"
            size="sm"
            value={paymentMethod}
            onChange={pm => {
              isMounted.current && setPaymentMethod(pm);
            }}>
            <VStack space={3}>
              <Radio
                alignItems="flex-start"
                icon={<Icon as={<FontAwesome5 name="hand-holding-usd" />} />}
                _text={{
                  mt: '-1',
                  ml: '2',
                  fontSize: 'md',
                }}
                value="COD">
                Cash on delivery
              </Radio>
              <Radio
                colorScheme="warning"
                mt={2}
                alignItems="flex-start"
                icon={<Icon as={<FontAwesome name="bank" />} />}
                _text={{
                  mt: '2',
                  ml: '2',
                  fontSize: 'md',
                }}
                value="Online">
                Online
              </Radio>
            </VStack>
          </Radio.Group>
          <Pressable onPress={() => handelPayment()}>
            <Box
              bg={COLORS.primary}
              alignItems={'center'}
              borderRadius={5}
              mt={5}>
              <Heading size={'sm'} color={COLORS.textWhite} py={1}>
                Continue
              </Heading>
            </Box>
          </Pressable>
        </>
      </ModalComponent>

      {/* Modal */}
      <SuccessVerificationModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        successMessage={successMessage}
      />

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Cancel Order</AlertDialog.Header>
          <AlertDialog.Body>
            This will cancel your order item . This action cannot be reversed.
            Cancel data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={() => handelCancelOrder()}>
                Cancel Order
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
