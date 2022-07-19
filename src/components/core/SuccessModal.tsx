import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Center, Modal, Pressable, Text} from 'native-base';
import LottieView from 'lottie-react-native';
import {REGISTER_SUCCESS} from 'assets';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';

type Props = {
  showModal?: boolean;
  setShowModal: (prev: boolean) => void;
};

const SuccessModal = ({showModal, setShowModal}: Props) => {
  const navigation = useNavigation<PublicNavigation>();
  const SignUpSuccess = () => {
    setShowModal(false);
    navigation.navigate('Login');
  };
  return (
    <>
      <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content bgColor={'white'}>
            <Modal.Body>
              <Box>
                <Center bg={'white'}>
                  <LottieView
                    source={REGISTER_SUCCESS}
                    autoPlay
                    loop={false}
                    style={styles.LottieView}
                  />

                  <Pressable
                    onPress={SignUpSuccess}
                    borderWidth={2}
                    borderColor={COLORS.cgcolor}
                    borderRadius={6}
                    mt={3}>
                    <Text px={10} bold py={1} color={'green.700'}>
                      Ok
                    </Text>
                  </Pressable>
                </Center>
              </Box>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    </>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  LottieView: {
    width: 200,
    height: 200,
  },
});
