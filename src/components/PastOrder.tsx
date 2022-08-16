import {Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {AYUSH_1, PRODUCT_PLACEHOLDER} from 'assets';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {PastOrderType} from 'types';
import {useSwrApi} from 'hooks';
import {post} from 'api';

type Props = {
  item: PastOrderType;
};

const PastOrder = ({item}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [reviewTitle, setReviewTitle] = useState<string>();
  const [reviewText, setReviewText] = useState<string>();
  const navigation = useNavigation<NavigationProps>();
  const {data, isValidating, mutate} = useSwrApi(
    `review/product/${item?.product?._id}`,
  );

  const ReviewData = data?.data?.data;

  const handelRatting = async () => {
    try {
      await post({
        path: 'review',
        body: JSON.stringify({
          orderId: item?._id,
          rating: ratings,
          title: reviewTitle,
          comment: reviewText,
        }),
      });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  return (
    <Box px={4} py={4}>
      <Box borderWidth={1} borderRadius={5} borderColor={COLORS.lightGrey}>
        <Pressable>
          <HStack alignItems={'center'} space={3} py={3} px={3}>
            <Image
              source={
                item?.product?.displayImage?.url
                  ? {uri: item?.product?.displayImage?.url}
                  : PRODUCT_PLACEHOLDER
              }
              style={styles.image}
              alt={'activeImg'}
              resizeMode="contain"
              bg={COLORS.lightGrey}
              borderRadius={6}
            />
            <VStack>
              <Text bold fontSize={14}>
                {item?.product?.title}
              </Text>
              <Text fontSize={13}>{item.total}</Text>
            </VStack>
          </HStack>
          <VStack px={3} space={1} pb={3}>
            <HStack justifyContent={'space-between'}>
              <Text bold>ID Order :</Text>
              <Text fontSize={15}>{item?._id}</Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text bold>Total Price :</Text>
              <Text fontSize={15}>&#8377; {item?.totalPrice}</Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text bold>Status :</Text>
              <Text color={'green.600'} bold>
                {item?.status}
              </Text>
            </HStack>
          </VStack>
        </Pressable>
        <HStack px={3} py={2} alignItems={'center'} space={4}>
          {data?.data?.status === 'SUCCESS' ? (
            <HStack mb={2} mt={1} width={Dimensions.get('window').width / 2.3}>
              <Pressable
              // onPress={() => setShowModal(true)}
              >
                <Text bold color={'amber.400'}>
                  Ratings :
                </Text>
              </Pressable>
              <Rating
                type="custom"
                startingValue={ReviewData?.rating}
                ratingColor={'green'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={20}
                onFinishRating={(rating: React.SetStateAction<number>) => {
                  setRatings(rating);
                }}
                readonly={true}
              />
            </HStack>
          ) : (
            <Pressable
              w={Dimensions.get('window').width / 2.3}
              onPress={() => setShowModal(true)}>
              <Box mr={2} alignItems={'center'}>
                <Text bold py={1} color={'green.500'}>
                  Rate This Product
                </Text>
              </Box>
            </Pressable>
          )}
          <Pressable
            flex={1}
            onPress={() =>
              navigation.navigate('OrderSummary', {
                // ProductDetailsType: {...item, discount: 799, offer: '20% OFF'},
                // type:"product",
                // productId:"",
              })
            }>
            <Box
              //   mr={2}
              bg={'green.100'}
              alignItems={'center'}
              borderWidth={1}
              borderColor={COLORS.primary}
              borderRadius={4}>
              <Text bold py={1} color={COLORS.primary}>
                Re-Order
              </Text>
            </Box>
          </Pressable>
        </HStack>
      </Box>
      {/* Modal */}
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Rate the Product</Modal.Header>
            <Modal.Body bg={COLORS.textWhite}>
              <Box borderBottomWidth={1} borderBottomColor={COLORS.lightGrey}>
                <HStack alignItems={'center'} mb={3}>
                  <Rating
                    type="custom"
                    startingValue={ratings}
                    ratingColor={'green'}
                    tintColor={'#fff'}
                    ratingBackgroundColor={COLORS.grey}
                    ratingCount={5}
                    imageSize={30}
                    onFinishRating={(rating: React.SetStateAction<number>) => {
                      setRatings(rating);
                    }}
                  />
                  <Text ml={3}>({ratings} / 5)</Text>
                </HStack>
              </Box>

              <Box
                borderBottomWidth={1}
                borderColor={COLORS.lightGrey}
                borderStyle={'dashed'}>
                <Input
                  placeholder="Review title"
                  multiline
                  fontSize={15}
                  variant="unstyled"
                  value={reviewTitle}
                  onChangeText={title => setReviewTitle(title)}
                />
              </Box>

              <Input
                placeholder="Write your review here..."
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                fontSize={15}
                variant="unstyled"
                value={reviewText}
                onChangeText={rt => setReviewText(rt)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Cancel
                </Button>
                <Button colorScheme={'green'} onPress={() => handelRatting()}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </Box>
  );
};

export default PastOrder;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
});
