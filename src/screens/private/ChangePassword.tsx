import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  FormControl,
  HStack,
  Input,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PrivateRoutesType} from 'src/routes/PrivateRoutes';
import {Controller, useForm} from 'react-hook-form';
import {changePasswordType, User} from 'types';
import {useActions, useFetch, useIsMounted} from 'hooks';
import {post} from 'api';
import {ErrorModal, SuccessVerificationModal} from 'components/core';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ChangePassword'>;
const ChangePassword = ({navigation}: Props) => {
  const {data} = useFetch<User>('user');
  const [showErrorModal, setShowErrorModal] = useState<boolean>();
  const [label, setLabel] = useState();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const isMounted = useIsMounted();
  const {setLoading} = useActions();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (Reset_data: changePasswordType) => {
    try {
      isMounted.current && setLoading(true);
      const ChangePasswordPost = await post({
        path: 'auth/forgot-password/verify-otp',
        body: JSON.stringify({
          email: data?.results.email,
          OTP: Reset_data.OTP,
          newPassword: Reset_data.Password,
          confirmPassword: Reset_data.retypePassword,
        }),
      });
      // console.log({ChangePasswordPost});
      if (ChangePasswordPost.status === 500) {
        setShowErrorModal(true);
        setLabel(ChangePasswordPost.error);
        return;
      }
      if (ChangePasswordPost.status === 200) {
        setSuccessMessage('Password Changed Successfully !');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  const resendOTP = async () => {
    console.log('object');
    try {
      isMounted.current && setLoading(true);
      const RESEND_OTP = await post({
        path: 'auth/forgot-password',
        body: JSON.stringify({
          email: data?.results?.email,
        }),
      });
      console.log({RESEND_OTP});
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box bg={COLORS.cgColor}>
        <HStack justifyContent={'space-between'} px={5} py={3}>
          <HStack space={4} alignItems={'center'}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.textWhite}
              onPress={() => navigation.goBack()}
            />
            <Text color={COLORS.textWhite} fontSize={17} bold>
              Change Password
            </Text>
          </HStack>
          <HStack space={4} alignItems={'center'}>
            <Ionicons
              name="search"
              size={24}
              color={COLORS.textWhite}
              onPress={() => navigation.navigate('Search')}
            />
            <Ionicons
              name="cart"
              size={24}
              color={COLORS.textWhite}
              onPress={() => navigation.navigate('Cart', {})}
            />
          </HStack>
        </HStack>
      </Box>
      <Box px={4}>
        <Box mt={4}>
          <Stack>
            <Text bold color={COLORS.grey}>
              Email ID
            </Text>
            <Text bold>{data?.results?.email}</Text>
          </Stack>
          <Stack mt={4}>
            <Text bold color={COLORS.grey}>
              Mobile Number
            </Text>
            <Text bold>+911234567890</Text>
          </Stack>
        </Box>
        <Box mt={2}>
          <FormControl isRequired isInvalid={'Password' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Box mt={4}>
                  <Input
                    placeholder="New Password"
                    variant={'underlined'}
                    fontSize={15}
                    h={10}
                    borderColor={COLORS.fadeBlack}
                    bgColor={COLORS.textWhite}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </Box>
              )}
              name="Password"
              rules={{
                required: 'Please provide the necessary details',
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.Password?.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={'retypePassword' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Box mt={4}>
                  <Input
                    placeholder="Retype Password"
                    variant={'underlined'}
                    fontSize={15}
                    h={10}
                    borderColor={COLORS.fadeBlack}
                    bgColor={COLORS.textWhite}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </Box>
              )}
              name="retypePassword"
              rules={{
                required: 'Please provide the necessary details',
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.retypePassword?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box mt={7}>
          <Text bold>Enter OTP sent to {data?.results.email}</Text>
          <FormControl isRequired isInvalid={'OTP' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  mt={3}
                  fontSize={16}
                  placeholder="OTP"
                  variant={'underlined'}
                  bgColor={COLORS.textWhite}
                  borderColor={COLORS.fadeBlack}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  InputRightElement={
                    <>
                      <Pressable onPress={() => console.log('touched')}>
                        <Text color={'green.600'} bold>
                          Resend
                        </Text>
                      </Pressable>
                    </>
                  }
                />
              )}
              name="OTP"
              rules={{
                required: 'Enter a valid OTP',
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.OTP?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </Box>
        <Box mt={12}>
          <HStack justifyContent={'space-evenly'}>
            <Pressable onPress={() => navigation.goBack()}>
              <Text bold fontSize={19} color={COLORS.grey}>
                Cancel
              </Text>
            </Pressable>
            <Pressable onPress={handleSubmit(onSubmit)}>
              <Text bold fontSize={20} color={'green.600'}>
                Save
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </Box>
      {/* Error modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label={label}
      />
      {/* Success Modal */}
      <SuccessVerificationModal
        setShowSuccessModal={setShowSuccessModal}
        showSuccessModal={showSuccessModal}
        successMessage={successMessage}
      />
    </Box>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
