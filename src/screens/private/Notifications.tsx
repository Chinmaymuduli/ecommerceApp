import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Actionsheet,
  AlertDialog,
  Box,
  Button,
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
import {useIsMounted, useNotifications} from 'hooks';
import {Empty, FetchLoader} from 'components/core';
import {NO_RESULT} from 'assets';
import {put, remove} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCloseAlert = () => setOpenAlert(false);
  const [notificationDes, setNotificationDes] = useState<any>();

  const cancelRef = React.useRef(null);
  const {setNotifications, notifications} = useNotifications();
  const isMounted = useIsMounted();

  const AddressFetch = async () => {
    try {
      isMounted.current && setIsLoading(true);
      const token = await AsyncStorage.getItem('access_token');
      const Response = await fetch(
        'https://chhattisgarh-herbals-api.herokuapp.com/api/notifications',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resData = await Response.json();
      setNotifications(resData?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setIsLoading(false);
    }
  };

  useEffect(() => {
    AddressFetch();
  }, []);

  const handelMarkAll = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const markAll = await put({
        path: 'notifications/mark-as-read',
        token: token,
      });
      console.log({markAll});
    } catch (error) {
      console.log(error);
    }
  };

  const handelAllDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const deleteAll = await remove({
        path: 'notifications',
        token: token,
      });
      console.log({deleteAll});
      setOpenAlert(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handelRead = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      console.log({data});
      setNotificationDes(data);
      onOpen();
      const markAsRead = await put({
        path: `notification/mark-as-read/${data.id}`,
        token: token,
      });
      // console.log({markAsRead});
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const singleDelete = await remove({
        path: `notification/${id}`,
        token: token,
      });
      // console.log({singleDelete});
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isLoading ? (
        notifications?.length > 0 ? (
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
                {notifications?.map((item: any) => (
                  <Pressable
                    key={item?.id}
                    borderBottomWidth={1}
                    onPress={() => handelRead(item)}
                    borderColor={COLORS.lightGrey}>
                    <Row space={3} justifyContent={'space-between'} py={5}>
                      <Row space={3} alignItems={'center'} w={230}>
                        <FontAwesome
                          name="shopping-basket"
                          size={25}
                          color={COLORS.primary}
                        />
                        <Text flexWrap={'wrap'}>{item?.label}</Text>
                      </Row>
                      <VStack mr={2} alignItems={'center'}>
                        <Text>{item?.time}</Text>
                        {item.isRead ? null : (
                          <Octicons
                            name="dot-fill"
                            size={15}
                            color={COLORS.primary}
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
                        color={COLORS.primary}
                      />
                      <Text flexWrap={'wrap'}>{item?.label}</Text>
                    </Row>
                    <VStack mr={2} alignItems={'center'}>
                      <Text>{item?.time}</Text>
                      {item.isRead ? null : (
                        <Octicons
                          name="dot-fill"
                          size={15}
                          color={COLORS.primary}
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
                <Text>{notificationDes?.label}</Text>
                <HStack space={6} mt={4}>
                  <Pressable
                    bg={'red.600'}
                    borderRadius={5}
                    onPress={() => handelDelete(notificationDes?.id)}>
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
          <Empty
            animation={NO_RESULT}
            title={'No notifications found'}
            noLoop
          />
        )
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
