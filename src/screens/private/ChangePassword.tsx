import {StyleSheet} from 'react-native';
import React from 'react';
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
import {changePasswordType} from 'types';

type Props = NativeStackScreenProps<PrivateRoutesType, 'ChangePassword'>;
const ChangePassword = ({navigation}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: changePasswordType) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box flex={1} bg={COLORS.textWhite}>
      <Box bg={COLORS.cgcolor}>
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
            <Text bold>demouser@gmail.com</Text>
          </Stack>
          <Stack mt={4}>
            <Text bold color={COLORS.grey}>
              Mobile Number
            </Text>
            <Text bold>+911234567890</Text>
          </Stack>
        </Box>
        <Box mt={2}>
          <FormControl isRequired isInvalid={'newPassword' in errors}>
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
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                </Box>
              )}
              name="newPassword"
              rules={{
                required: 'Please provide the necessary details',
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.newPassword?.message}
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
                    onChange={onChange}
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
          <Text bold>Enter OTP sent to +911234567890</Text>
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
                  InputRightElement={
                    <>
                      <Text color={'green.600'} bold>
                        Resend
                      </Text>
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
    </Box>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
