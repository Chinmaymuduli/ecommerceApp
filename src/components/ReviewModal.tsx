import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Button, Center, HStack, Input, Modal, Text} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';
import {useIsMounted, useSwrApi} from 'hooks';
import {put} from 'api';

type ReviewModalType = {
  setShowModal: (previousValue: boolean) => void;
  showModal: boolean;
  reviewMutate: () => void;
  reviewId?: string;
  setReview: (txt: string) => void;
};

const ReviewModal = ({
  setShowModal,
  showModal,
  reviewMutate,
  reviewId,
  setReview,
}: ReviewModalType) => {
  const isMounted = useIsMounted();
  const {data, isValidating} = useSwrApi(`review/${reviewId}`);
  const review = data?.data?.data;

  const [ratings, setRatings] = useState<any>();
  const [reviewTitle, setReviewTitle] = useState<string>();
  const [reviewComment, setReviewComment] = useState<string>();
  useEffect(() => {
    isMounted.current && setReviewTitle(review?.title);
    isMounted.current && setReviewComment(review?.comment);
    isMounted.current && setRatings(review?.rating);
  }, [review]);

  const updateReview = async () => {
    try {
      const res = await put({
        path: `review/${reviewId}`,
        body: JSON.stringify({
          rating: ratings,
          comment: reviewComment,
          title: reviewTitle,
        }),
      });

      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      reviewMutate();
    }
  };
  return (
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
                <Text ml={3}>({review?.rating} / 5)</Text>
              </HStack>
            </Box>
            <Box
              borderBottomWidth={1}
              borderStyle={'dashed'}
              borderColor={COLORS.lightGrey}>
              <Input
                placeholder="Title here..."
                multiline
                fontSize={15}
                variant="unstyled"
                value={reviewTitle}
                onChangeText={rt => setReviewTitle(rt)}
              />
            </Box>
            <Input
              placeholder="Write your review here..."
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              fontSize={15}
              variant="unstyled"
              value={reviewComment}
              onChangeText={rc => setReviewComment(rc)}
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
              <Button colorScheme={'green'} onPress={() => updateReview()}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({});
