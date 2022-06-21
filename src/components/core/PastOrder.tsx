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
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import {AYUSH_1} from 'assets';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';

const PastOrder = ({item}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [ratings, setRatings] = useState(0);
  const navigation = useNavigation<NavigationProps>();
  return (
    <Box px={4} py={4}>
      <Box borderWidth={1} borderRadius={5} borderColor={COLORS.lightGrey}>
        <Pressable>
          <HStack alignItems={'center'} space={3} py={3} px={3}>
            <Image
              source={AYUSH_1}
              style={styles.image}
              alt={'activeImg'}
              resizeMode="contain"
              bg={COLORS.lightGrey}
              borderRadius={6}
            />
            <VStack>
              <Text bold fontSize={14}>
                {item.label}
              </Text>
              <Text fontSize={13}>{item.total}</Text>
            </VStack>
          </HStack>
          <VStack px={3} space={1} pb={3}>
            <HStack justifyContent={'space-between'}>
              <Text bold>ID Order :</Text>
              <Text fontSize={15}>{item?.OrderID}</Text>
            </HStack>
            <HStack justifyContent={'space-between'}>
              <Text bold>Total Price :</Text>
              <Text fontSize={15}>&#8377; {item?.price}</Text>
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
          {ratings > 0 ? (
            <HStack mb={2} mt={1} width={Dimensions.get('window').width / 2.3}>
              <Pressable onPress={() => setShowModal(true)}>
                <Text bold color={'amber.400'}>
                  Ratings :
                </Text>
              </Pressable>
              <Rating
                type="custom"
                startingValue={ratings}
                ratingColor={'green'}
                tintColor={'#fff'}
                ratingBackgroundColor={COLORS.grey}
                ratingCount={5}
                imageSize={20}
                onFinishRating={(rating: React.SetStateAction<number>) => {
                  setRatings(rating);
                }}
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
                ...item,
                discount: 799,
                offer: '20% OFF',
              })
            }>
            <Box
              //   mr={2}
              bg={'green.100'}
              alignItems={'center'}
              borderWidth={1}
              borderColor={COLORS.cgcolor}
              borderRadius={4}>
              <Text bold py={1} color={COLORS.cgcolor}>
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
              {/* </Box> */}
              <Box>
                <Input
                  placeholder="Write your review here..."
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                  fontSize={15}
                  variant="unstyled"
                />
              </Box>
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
