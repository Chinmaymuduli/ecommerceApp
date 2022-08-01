import {Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  Center,
  Heading,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {resetImg, SUCCESS} from 'assets';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PublicRoutesType} from 'src/routes/PublicRoutes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {post} from 'api';
import {ErrorModal} from 'components/core';
import {useActions, useIsMounted} from 'hooks';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<PublicRoutesType, 'ResetPassword'>;
const ResetPassword = ({route: {params}, navigation}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const [password, setPassword] = useState<string>();
  const [confirmTextPassword, setConfirmTextPassword] = useState<string>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const isMounted = useIsMounted();
  const {setLoading} = useActions();
  const handelResetPassword = async () => {
    try {
      isMounted.current && setLoading(true);
      const resetPassword = await post({
        path: 'auth/forgot-password/verify-otp',
        body: JSON.stringify({
          email: params.Email,
          OTP: params.code,
          newPassword: password,
          confirmPassword: confirmTextPassword,
        }),
      });

      if (resetPassword.status === 500) {
        setShowErrorModal(true);
        setLabel(resetPassword.error);
        return;
      }
      setShowSuccessModal(true);
      setSuccessMessage('Password Set Successfully !');
    } catch (error) {
      if (error instanceof Error) return Alert.alert('Error', error.message);
      return Alert.alert('Error', 'Something went wrong');
    } finally {
      isMounted.current && setLoading(false);
    }
  };
  const handelReset = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };
  return (
    <Box bg={COLORS.textWhite} flex={1}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Center mt={10}>
          <Image
            alt="resetImg"
            source={resetImg}
            style={{
              height: 300,
              width: 300,
            }}
          />
        </Center>
        <Box px={5}>
          <Heading fontSize={30}>Reset</Heading>
          <Heading fontSize={30}>Password</Heading>
          <Box mt={5}>
            <Input
              placeholder="New Password"
              fontSize={15}
              variant="underlined"
              secureTextEntry={showPassword ? false : true}
              pl={3}
              value={password}
              onChangeText={pw => setPassword(pw)}
              InputRightElement={
                <>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={25}
                    color={COLORS.fadeBlack}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </>
              }
            />
            <Input
              mt={6}
              placeholder="Confirm Password"
              fontSize={15}
              variant="underlined"
              secureTextEntry={confirmPassword ? false : true}
              pl={3}
              value={confirmTextPassword}
              onChangeText={cf => setConfirmTextPassword(cf)}
              InputRightElement={
                <>
                  <Ionicons
                    name={confirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={25}
                    color={COLORS.fadeBlack}
                    onPress={() => setConfirmPassword(!confirmPassword)}
                  />
                </>
              }
            />
          </Box>
          <Pressable mt={10} onPress={handelResetPassword}>
            <Box bg={'#92E3A9'} borderRadius={5}>
              <Text py={2} textAlign={'center'} bold letterSpacing={1}>
                Reset Password
              </Text>
            </Box>
          </Pressable>
        </Box>
      </ScrollView>
      {/* Modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label={label}
      />
      {/* Success */}

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
                    onPress={handelReset}
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
    </Box>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  LottieView: {
    width: 200,
    height: 200,
  },
});
