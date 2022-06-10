import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  FlatList,
  Pressable,
  Row,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {COLORS} from 'configs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
const notificationsArr = [
  {
    label: '50% off in Ayush Products',
    time: '7:10 AM',
    type: 'Product',
    new: 'today',
    isRead: false,
  },
  {
    label: '50% off in Gurumet Products',
    time: '5:05 AM',
    type: 'Product',
    new: 'today',
    isRead: false,
  },
  {
    label: 'Package from your order #CH123456 has arrived',
    time: 'Yesterday',
    type: 'shopping',
    isRead: true,
    new: 'yesterday',
  },
];

const Notifications = () => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <Box>
        <Row>
          <Text>Today</Text>
          <Box bg={'blue.200'}>
            <Text color={'green.600'}>2</Text>
          </Box>
        </Row>
      </Box>
    );
  };
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable alignItems={'flex-end'} px={5} py={3}>
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
        <Box px={4}>
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
          {notificationsArr.map((item, index) => (
            <Box
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
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
