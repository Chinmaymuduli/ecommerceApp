import React, {useState} from 'react';
import {Box, Center, Heading, Input, Modal, Pressable, Row} from 'native-base';
import {EMAIL} from 'assets';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ErrorModal, SuccessVerificationModal} from './core';
import {post} from 'api';
type Props = {
  showEmailModal?: boolean;
  setShowEmailModal: (prev: boolean) => void;
};
export default function VerifyEmailModal({
  showEmailModal,
  setShowEmailModal,
}: Props) {
  const [email, setEmail] = useState<string>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const handelVerifyEmail = async () => {
    try {
      setShowEmailModal(false);
      const verifyEmail = await post({
        path: 'auth/resend-email-verification',
        body: JSON.stringify({
          email: email,
        }),
      });
      console.log({verifyEmail});
      if (verifyEmail.status === 500) {
        setShowErrorModal(true);
        setLabel(verifyEmail.error);
        return;
      }
      setShowSuccessModal(true);
      setSuccessMessage('Link send to your email for verification !');
    } catch (error) {
      console.log(error);
    } finally {
      setEmail('');
    }
  };
  return (
    <>
      <Center>
        <Modal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)}>
          <Modal.Content width={'300'} height={'400'}>
            <Modal.Body>
              <Center>
                <LottieView
                  source={EMAIL}
                  autoPlay
                  loop={true}
                  style={styles.LottieView}
                />
                <Heading size={'md'} textAlign={'center'} mt={1}>
                  Verify your email address !
                </Heading>
              </Center>
              <Box mt={6}>
                <Input
                  placeholder="Enter Your Email"
                  variant={'underlined'}
                  fontSize={15}
                  pl={2}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={em => setEmail(em)}
                  InputRightElement={
                    <>
                      <Ionicons name="at" size={25} color={COLORS.fadeBlack} />
                    </>
                  }
                />
              </Box>
              <Row space={5} mt={10} justifyContent={'flex-end'}>
                <Pressable
                  onPress={() => setShowEmailModal(false)}
                  borderWidth={1}
                  borderColor={'red.500'}
                  borderRadius={5}>
                  <Heading fontSize={15} color={'red.500'} px={4} py={2}>
                    Cancel
                  </Heading>
                </Pressable>
                <Pressable
                  bg={COLORS.cgcolor}
                  borderRadius={5}
                  onPress={handelVerifyEmail}>
                  <Heading fontSize={15} color={'white'} px={4} py={2}>
                    Verify
                  </Heading>
                </Pressable>
              </Row>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
      {/* Success Modal */}
      <SuccessVerificationModal
        setShowSuccessModal={setShowSuccessModal}
        showSuccessModal={showSuccessModal}
        successMessage={successMessage}
      />
      {/* Error Modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label={label}
      />
    </>
  );
}

const styles = StyleSheet.create({
  LottieView: {
    width: 150,
    height: 170,
  },
});
