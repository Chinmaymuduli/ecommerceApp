import {StyleSheet} from 'react-native';
import React from 'react';
import {Box, Center, Heading, Modal, Pressable, Text} from 'native-base';
import LottieView from 'lottie-react-native';
import {ERROR} from 'assets';

const ErrorModal = ({showErrorModal, setShowErrorModal, label}: any) => {
  return (
    <>
      <Center>
        <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Body>
              <Box>
                <Center>
                  <LottieView
                    source={ERROR}
                    autoPlay
                    loop={false}
                    style={styles.LottieView}
                  />
                  <Heading size={'md'} textAlign={'center'} mt={4}>
                    {label}
                  </Heading>
                  <Pressable
                    onPress={() => setShowErrorModal(false)}
                    borderWidth={2}
                    borderColor={'red.400'}
                    borderRadius={6}
                    mt={3}>
                    <Text px={10} bold py={1} color={'red.400'}>
                      OK
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

export default ErrorModal;

const styles = StyleSheet.create({
  LottieView: {
    width: 140,
    height: 140,
  },
});
