import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Center, Heading, Modal, Pressable, Text} from 'native-base';
import {COLORS} from 'configs';
import LottieView from 'lottie-react-native';
import {SUCCESS} from 'assets';

type Props = {
  showSuccessModal?: boolean;
  setShowSuccessModal: (prev: boolean) => void;
  successMessage?: string;
};

const SuccessVerificationModal = ({
  showSuccessModal,
  setShowSuccessModal,
  successMessage,
}: Props) => {
  return (
    <>
      <Center>
        <Modal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}>
          <Modal.Content bgColor={'white'}>
            <Modal.Body>
              <Box>
                <Center bg={'white'}>
                  <LottieView
                    source={SUCCESS}
                    autoPlay
                    loop={false}
                    style={styles.LottieView}
                  />
                  <Heading textAlign={'center'} fontSize={17}>
                    {successMessage}
                  </Heading>
                  <Pressable
                    onPress={() => setShowSuccessModal(false)}
                    borderWidth={2}
                    borderColor={COLORS.primary}
                    borderRadius={6}
                    mt={5}>
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

export default SuccessVerificationModal;

const styles = StyleSheet.create({
  LottieView: {
    width: 200,
    height: 200,
  },
});
