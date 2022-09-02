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
import {useIsMounted, useSwrApi} from 'hooks';
import {Empty, FetchLoader} from 'components/core';
import {NO_RESULT} from 'assets';
import {put, remove} from 'api';
import moment from 'moment';

type NotificationsType = {
  _id?: string | any;
  description?: string;
  message?: string;
  updatedAt?: string;
  isRead?: boolean;
};

const Notifications = () => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [openAlert, setOpenAlert] = React.useState(false);
  const onCloseAlert = () => setOpenAlert(false);
  const [notificationDes, setNotificationDes] = useState<NotificationsType>();

  const cancelRef = React.useRef(null);
  const isMounted = useIsMounted();
  const [notificationData, setNotificationData] = useState([]);

  const {data, mutate, isValidating} = useSwrApi('notifications');

  useEffect(() => {
    isMounted.current && setNotificationData(data?.data?.data?.data);
  }, [data]);

  const handelMarkAll = async () => {
    try {
      await put({
        path: 'notifications/mark-as-read',
      });
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const handelAllDelete = async () => {
    try {
      await remove({
        path: 'notifications',
      });
      setOpenAlert(false);
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const handelRead = async (data: NotificationsType) => {
    try {
      await put({
        path: `notification/mark-as-read/${data._id}`,
      });
      setNotificationDes(data);
      onOpen();
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  const handelDelete = async (_id: NotificationsType) => {
    try {
      await remove({
        path: `notification/${_id}`,
      });
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      mutate();
    }
  };

  return (
    <>
      {!isValidating ? (
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
                {/* <Row alignItems={'center'} space={2}>
                  <Text bold fontSize={16}>
                    Unread
                  </Text>
                  <Box bg={'blue.50'} borderRadius={10}>
                    <Text color={'green.600'} px={1} fontSize={14}>
                      1
                    </Text>
                  </Box>
                </Row> */}
                {notificationData?.map((item: NotificationsType) => (
                  <Pressable
                    key={item?._id}
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
                        <Text flexWrap={'wrap'}>{item?.message}</Text>
                      </Row>
                      <VStack mr={2} alignItems={'center'}>
                        <Text>{moment(item?.updatedAt).format('LT')}</Text>

                        {item?.isRead ? null : (
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
            </ScrollView>
            {/* Actionsheet */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
              <Actionsheet.Content>
                <Text>{notificationDes?.message}</Text>
                <HStack space={6} mt={4}>
                  <Pressable
                    bg={'red.600'}
                    borderRadius={5}
                    onPress={() => handelDelete(notificationDes?._id)}>
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
