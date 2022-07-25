import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Actionsheet,
  AlertDialog,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Pressable,
  Row,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {useAccessToken, useFetch} from 'hooks';
import {Empty, FetchLoader} from 'components/core';
import {NORESULT, NOTIFICATIONS} from 'assets';
import LottieView from 'lottie-react-native';
import {post, put, remove} from 'api';
const notificationsArr = [
  {
    label: '50% off in Ayush Products',
    time: '7:10 AM',
    type: 'Product',
    new: 'today',
    isRead: false,
    id: 1,
  },
  {
    label: '50% off in Gurumet Products',
    time: '5:05 AM',
    type: 'Product',
    new: 'today',
    isRead: false,
    id: 2,
  },
  {
    label: 'Package from your order #CH123456 has arrived',
    time: '10:20 AM',
    type: 'shopping',
    isRead: true,
    new: 'today',
    id: 3,
  },
];

const notificationsEarlierArr = [
  {
    label: 'Package from your order #CH123456 has arrived',
    time: 'yesterday',
    type: 'shopping',
    isRead: false,
    new: 'today',
  },
  {
    label: '70% off in Ayush Products',
    time: 'june 19',
    type: 'Product',
    new: 'today',
    isRead: false,
  },
  {
    label: '55% off in Gurumet Products',
    time: 'june 15',
    type: 'Product',
    new: 'today',
    isRead: false,
  },
];

const Notifications = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [notificationData, setNotificationsData] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const onCloseAlert = () => setOpenAlert(false);
  const [notificationDes, setNotificationDes] = useState();

  const cancelRef = React.useRef(null);
  const {accessToken} = useAccessToken();

  const AddressFetch = async () => {
    const Response = await fetch(
      'https://chhattisgarh-herbals-api.herokuapp.com/api/notifications',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const resData = await Response.json();
    setNotificationsData(resData?.data?.data);
  };

  useEffect(() => {
    AddressFetch();
  }, []);

  const handelMarkAll = async () => {
    try {
      const markAll = await put({
        path: 'notifications/mark-as-read',
        token: accessToken,
      });
      console.log({markAll});
    } catch (error) {
      console.log(error);
    }
  };

  const handelAllDelete = async () => {
    try {
      const deleteAll = await remove({
        path: 'notifications',
        token: accessToken,
      });
      console.log({deleteAll});
      setOpenAlert(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelRead = async ({data}: any) => {
    try {
      setNotificationDes(data);
      onOpen();
      const markAsRead = await put({
        path: `notification/mark-as-read/${data.id}`,
        token: accessToken,
      });
      console.log({markAsRead});
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (id: any) => {
    try {
      const singleDelete = await remove({
        path: `notification/${id}`,
        token: accessToken,
      });
      console.log({singleDelete});
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isLoading ? (
        notificationData?.length > 0 ? (
          <Box flex={1} bg={COLORS.textWhite}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <HStack justifyContent={'space-between'} px={4}>
                <Pressable py={3} onPress={() => setOpenAlert(!openAlert)}>
                  <Box
                    borderWidth={1}
                    alignItems={'center'}
                    borderRadius={5}
                    borderColor={'green.600'}>
                    <Text bold py={2} px={3} color={'green.600'}>
                      Clear All
                    </Text>
                  </Box>
                </Pressable>
                <Pressable py={3} onPress={() => handelMarkAll()}>
                  <Box
                    borderWidth={1}
                    alignItems={'center'}
                    borderRadius={5}
                    borderColor={'green.600'}>
                    <Text bold py={2} px={3} color={'green.600'}>
                      Mark as all read
                    </Text>
                  </Box>
                </Pressable>
              </HStack>
              <Box px={4} mt={3}>
                <Row alignItems={'center'} space={2}>
                  <Text bold fontSize={16}>
                    Today
                  </Text>
                  <Box bg={'blue.50'} borderRadius={10}>
                    <Text color={'green.600'} px={1} fontSize={14}>
                      2
                    </Text>
                  </Box>
                </Row>
                {notificationData.map((item: any) => (
                  <Pressable
                    onPress={() => handelRead(item)}
                    key={item?.id}
                    borderBottomWidth={1}
                    borderColor={COLORS.lightGrey}>
                    <Row space={3} justifyContent={'space-between'} py={5}>
                      <Row space={3} alignItems={'center'} w={230}>
                        <FontAwesome
                          name="shopping-basket"
                          size={25}
                          color={COLORS.cgcolor}
                        />
                        <Text flexWrap={'wrap'}>{item?.label}</Text>
                      </Row>
                      <VStack mr={2} alignItems={'center'}>
                        <Text>{item?.time}</Text>
                        {item.isRead ? null : (
                          <Octicons
                            name="dot-fill"
                            size={15}
                            color={COLORS.cgcolor}
                          />
                        )}
                      </VStack>
                    </Row>
                  </Pressable>
                ))}
              </Box>
              {/* <Box px={3} mt={4}>
              <Row alignItems={'center'} space={2}>
                <Text bold fontSize={16} color={COLORS.grey}>
                  Earlier
                </Text>
                <Box bg={'blue.50'} borderRadius={50}>
                  <Text color={'green.600'} px={1} fontSize={14}>
                    3
                  </Text>
                </Box>
              </Row>
              {notificationsEarlierArr.map((item, index) => (
                <Pressable
                  onPress={onOpen}
                  key={index}
                  borderBottomWidth={1}
                  borderColor={COLORS.lightGrey}>
                  <Row space={3} justifyContent={'space-between'} py={5}>
                    <Row space={3} alignItems={'center'} w={230}>
                      <FontAwesome
                        name="shopping-basket"
                        size={25}
                        color={COLORS.cgcolor}
                      />
                      <Text flexWrap={'wrap'}>{item?.label}</Text>
                    </Row>
                    <VStack mr={2} alignItems={'center'}>
                      <Text>{item?.time}</Text>
                      {item.isRead ? null : (
                        <Octicons
                          name="dot-fill"
                          size={15}
                          color={COLORS.cgcolor}
                        />
                      )}
                    </VStack>
                  </Row>
                </Pressable>
              ))}
            </Box> */}
            </ScrollView>
            {/* Actionsheet */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Text>
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  {/* {notificationDes?.label} */}
                </Text>
                <HStack space={6} mt={4}>
                  <Pressable
                    bg={'red.600'}
                    borderRadius={5}
                    // onPress={() => handelDelete(notificationDes?.id)}
                    onPress={() => handelDelete()}>
                    <Text px={7} py={1} color={COLORS.textWhite} bold>
                      Delete
                    </Text>
                  </Pressable>
                  <Pressable
                    bg={'green.800'}
                    borderRadius={5}
                    onPress={onClose}>
                    <Text px={7} py={1} color={COLORS.textWhite} bold>
                      Cancel
                    </Text>
                  </Pressable>
                </HStack>
              </Actionsheet.Content>
            </Actionsheet>
            {/* Alert */}
            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={openAlert}
              onClose={onCloseAlert}>
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Delete Item</AlertDialog.Header>
                <AlertDialog.Body>
                  This will all notifications data. This action cannot be
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
                    <Button colorScheme="danger" onPress={handelAllDelete}>
                      Delete
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Box>
        ) : (
          <Empty animation={NORESULT} title={'No notifications found'} noLoop />
        )
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
