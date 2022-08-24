import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {AYUSH_1} from 'assets';
import {
  FetchLoader,
  SuccessModal,
  SuccessVerificationModal,
  Track,
} from 'components/core';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {useIsMounted, useSwrApi} from 'hooks';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetToken} from 'src/api/authFetch';
import {BASE_URL, post, remove} from 'api';

type Props = NativeStackScreenProps<PrivateRoutesType, 'OrderDetails'>;
const OrderDetails = ({route: {params}}: Props) => {
  const orderID = params?.orderId;
  const {data, isValidating} = useSwrApi(`order/${orderID}`);
  const OrderDetailsData = data?.data?.data;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const isMounted = useIsMounted();
  const GetToken = async () => {
    const getRefreshToken = await AsyncStorage.getItem('tokenId');
    const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: getRefreshToken,
      }),
    });
    const getResponseData = await getResponse.json();
  };

  const removeInvoice = async () => {
    await remove({
      path: `invoice/${orderID}`,
    });
  };
  const handelInvoice = async () => {
    try {
      const getAccessToken = await AsyncStorage.getItem('access_token');
      const {config, fs} = RNFetchBlob;
      let DOCUMENT_DIR = fs.dirs.DownloadDir;
      let Download_Url = `https://chhattisgarh-herbals-api.herokuapp.com/api/invoice/${orderID}`;
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
      const fileDownload = config(options)
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
  return (
    <>
      {isValidating ? (
        <FetchLoader />
      ) : (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Text color={'gray.500'}>Seller : Chhatisgarh Herbals</Text>
                    <Text bold fontSize={16}>
                      &#8377;{' '}
                      {OrderDetailsData?.product.salePrice *
                        OrderDetailsData?.quantity}
                    </Text>
                  </VStack>
                  <Box w={'30%'}>
                    <Image
                      source={AYUSH_1}
                      style={styles.image}
                      alt={'detailsImg'}
                      resizeMode="contain"
                      bg={'green.50'}
                      borderRadius={4}
                    />
                  </Box>
                </HStack>
                {(OrderDetailsData?.status === 'INITIATED' ||
                  OrderDetailsData?.status === 'SHIPPED') && (
                  <Pressable
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
              <Box borderBottomWidth={3} borderColor={COLORS.lightGrey}>
                <Track track={OrderDetailsData} />
              </Box>
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
                      {OrderDetailsData?.product?.salePrice *
                        OrderDetailsData?.quantity}
                    </Text>
                  </HStack>
                </Box>
              </Box>
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
                      {OrderDetailsData?.totalPrice}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      )}

      {/* Modal */}
      <SuccessVerificationModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        successMessage={successMessage}
      />
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
