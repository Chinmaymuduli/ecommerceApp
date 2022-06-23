import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
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
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReviewModal from './ReviewModal';
import {reviewType} from 'types';
type Props = {
  item: reviewType;
};

const MyReviewCard = ({item}: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [ratings, setRatings] = useState<number>(item?.rating);
  const [review, setReview] = useState<string>();
  const [reviewText, setReviewText] = useState();
  const [isOpen, setIsOpen] = React.useState(false);
  // console.log(item);
  const openModal = (reviewTxt: string) => {
    setShowModal(true);
    setReview(reviewTxt);
  };

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
  return (
    <>
      <Box bg={COLORS.lightGrey}>
        <Box bg={COLORS.textWhite} mx={2} mb={2} mt={1} borderRadius={5}>
          <Box px={4}>
            <HStack space={4} alignItems={'center'}>
              <Box h={100} alignItems={'center'} justifyContent={'center'}>
                <Image
                  source={item?.img}
                  style={styles.image}
                  alt={'reviewImg'}
                  resizeMode="contain"
                />
              </Box>
              <VStack space={1}>
                <Text bold fontSize={15}>
                  {item?.name}
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
                <Text>{item?.date}</Text>
              </VStack>
            </HStack>
            <Box>
              <Text>{item?.review}</Text>
            </Box>
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
                <Pressable onPress={() => openModal(item?.review)}>
                  <HStack space={2}>
                    <AntDesign name="edit" size={22} color={COLORS.cgcolor} />
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
        ratings={ratings}
        setRatings={setRatings}
        reviewData={review}
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
              <Button colorScheme="danger" onPress={onClose}>
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
