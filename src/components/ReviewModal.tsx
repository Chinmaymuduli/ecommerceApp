import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Box, Button, Center, HStack, Input, Modal, Text} from 'native-base';
import {COLORS} from 'configs';
import {Rating} from 'react-native-ratings';

const ReviewModal = ({
  setShowModal,
  showModal,
  ratings,
  setRatings,
  reviewData,
  setReview,
}: any) => {
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
                <Text ml={3}>({ratings} / 5)</Text>
              </HStack>
            </Box>

            <Input
              placeholder="Write your review here..."
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              fontSize={15}
              variant="unstyled"
              value={reviewData?.review}
              onChange={txt => setReview(txt)}
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
              <Button
                colorScheme={'green'}
                onPress={() => {
                  setShowModal(false);
                }}>
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
