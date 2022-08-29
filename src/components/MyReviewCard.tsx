import AntDesign from 'react-native-vector-icons/AntDesign';
import {Rating} from 'react-native-ratings';
import {PRODUCT_PLACEHOLDER} from 'assets';
import {StyleSheet} from 'react-native';
import ReviewModal from './ReviewModal';
import React, {useState} from 'react';
import {reviewType} from 'types';
import {COLORS} from 'configs';
import moment from 'moment';
import {
  AlertDialog,
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import {remove} from 'api';

type Props = {
  item: reviewType;
  reviewMutate: () => void;
};

const MyReviewCard = ({item, reviewMutate}: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [review, setReview] = useState<string>();
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setShowModal(true);
    setReview(item?._id);
  };

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  const handelDelete = async () => {
    try {
      const res = await remove({
        path: `review/${item?._id}`,
      });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      reviewMutate();
    }
  };

  console.log(item?.order?.product?.displayImage?.url);

  return (
    <>
      <Box bg={COLORS.lightGrey}>
        <Box bg={COLORS.textWhite} mx={2} mb={2} mt={1} borderRadius={5}>
          <Box px={4}>
            <HStack space={4} alignItems={'center'}>
              <Box h={100} alignItems={'center'} justifyContent={'center'}>
                <Image
                  source={
                    item?.order?.product?.displayImage?.url
                      ? {uri: item?.order?.product?.displayImage?.url}
                      : PRODUCT_PLACEHOLDER
                  }
                  style={styles.image}
                  alt={'reviewImg'}
                  resizeMode="contain"
                />
              </Box>
              <VStack space={1}>
                <Text bold fontSize={15}>
                  {item?.order?.product?.title}
                </Text>
                <HStack alignItems={'center'}>
                  <Rating
                    type="custom"
                    startingValue={item?.rating}
                    ratingColor={'green'}
                    tintColor={'#fff'}
                    ratingBackgroundColor={COLORS.grey}
                    ratingCount={5}
                    imageSize={30}
                    readonly={true}
                  />
                </HStack>
                <Text>{moment(item?.updatedAt).format('l')}</Text>
              </VStack>
            </HStack>
            <Text bold>{item?.title}</Text>
            <Text>{item?.comment}</Text>
            <Box my={4}>
              <HStack justifyContent={'space-evenly'}>
                <Pressable onPress={() => setIsOpen(!isOpen)}>
                  <HStack space={2}>
                    <AntDesign name="delete" size={20} color={'red'} />
                    <Text bold color={COLORS.fadeBlack}>
                      Delete
                    </Text>
                  </HStack>
                </Pressable>
                <Box borderRightWidth={2} borderColor={COLORS.grey}></Box>
                <Pressable onPress={() => openModal()}>
                  <HStack space={2}>
                    <AntDesign name="edit" size={22} color={COLORS.primary} />
                    <Text bold color={COLORS.fadeBlack}>
                      Edit
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Modal */}
      <ReviewModal
        setShowModal={setShowModal}
        showModal={showModal}
        reviewMutate={reviewMutate}
        reviewId={review}
        setReview={setReview}
      />
      {/* Delete Alert */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Review</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to Review. This action cannot be
            reversed. Deleted data can not be recovered.
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
              <Button colorScheme="danger" onPress={() => handelDelete()}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default MyReviewCard;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
  },
});
