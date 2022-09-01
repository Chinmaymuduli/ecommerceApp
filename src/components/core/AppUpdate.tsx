import {DevSettings, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  Pressable,
  Text,
} from 'native-base';
import LottieView from 'lottie-react-native';
import {UPDATE_APP} from 'assets';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: any;
};

const AppUpdate = ({data}: Props) => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(true);
  //   console.log({data});
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center h={150} w={230}>
              <LottieView source={UPDATE_APP} loop={true} autoPlay={true} />
            </Center>
            <Box justifyContent={'center'} alignItems={'center'} mt={4}>
              <Text bold fontSize={15}>
                App Update Available
              </Text>
              <Text textAlign={'center'} mt={2} fontSize={15}>
                Please click the button below to update the app
              </Text>
            </Box>
            <Center mt={5}>
              <HStack space={8}>
                {data?.data?.androidApp?.isDismissible !== true && (
                  <Pressable
                    // onPress={() => navigation.navigate(<PrivateRoutes/>)}
                    borderWidth={1}
                    borderRadius={5}
                    borderColor={COLORS.primary}>
                    <Heading size={'sm'} px={3} py={1}>
                      Cancel
                    </Heading>
                  </Pressable>
                )}
                <Pressable
                  bg={COLORS.primary}
                  borderRadius={5}
                  onPress={() => DevSettings.reload()}>
                  <Heading size={'sm'} color={COLORS.textWhite} px={3} py={1}>
                    Update
                  </Heading>
                </Pressable>
              </HStack>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default AppUpdate;

const styles = StyleSheet.create({});
