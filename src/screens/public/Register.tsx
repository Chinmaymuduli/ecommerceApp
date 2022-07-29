import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  Box,
  FormControl,
  Heading,
  Image,
  Input,
  Pressable,
  Row,
  ScrollView,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import {ICONS, LoginBg, LOGO} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';
import {Controller, useForm} from 'react-hook-form';
import {useActions, useIsMounted} from 'hooks';
import {post} from 'api';
import {ErrorModal, SuccessModal} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

type REGISTER_DATA = {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
};
const Register = () => {
  const navigation = useNavigation<PublicNavigation>();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const {setLoading} = useActions();
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState();
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm();
  const isMounted = useIsMounted();

  const onSubmit = async (data: REGISTER_DATA) => {
    try {
      isMounted.current && setLoading(true);
      const createData = await post({
        path: 'auth/signup',
        body: JSON.stringify({
          displayName: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
      console.log({createData});
      if (createData.status === 200) {
        setShowModal(true);
        await AsyncStorage.setItem('isUserEnter', JSON.stringify(true));
        return;
      }
      setShowErrorModal(true);
      setLabel(createData.error);
    } catch (error: any) {
      if (error instanceof Error) return Alert.alert('Error', error.message);
      return Alert.alert('Error', 'Something went wrong');
    } finally {
      isMounted.current && setLoading(false);
      reset();
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Image source={LoginBg} h={150} w={'full'} alt={'image'} />
        <Box bg={COLORS.textWhite} mt={-12} borderTopRadius={25}>
          <Box px={3}>
            <Box alignItems={'center'}>
              <Image
                source={LOGO}
                alt={'Logo'}
                h={100}
                w={130}
                resizeMode={'contain'}
              />
            </Box>
            <Box mt={4}>
              <Heading>Register</Heading>
              <Text bold color={COLORS.grey} mt={2} mb={2}>
                Login or Create account quickly to manage your orders
              </Text>
              <FormControl isRequired isInvalid={'name' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box
                      borderWidth={1}
                      borderColor={COLORS.cgColor}
                      borderRadius={10}
                      mt={3}>
                      <Input
                        placeholder="Full Name"
                        variant={'unstyled'}
                        fontSize={14}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        borderRadius={10}
                        InputRightElement={
                          <Box mr={2}>
                            <ICONS.User size={20} color={COLORS.fadeBlack} />
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  name="name"
                  rules={{
                    required: 'Name is required',
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.name?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'email' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box
                      borderWidth={1}
                      borderColor={COLORS.cgColor}
                      borderRadius={10}
                      mt={5}>
                      <Input
                        placeholder="Email Address"
                        variant={'unstyled'}
                        fontSize={14}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        borderRadius={10}
                        InputRightElement={
                          <Box mr={2}>
                            <ICONS.Email size={20} color={COLORS.fadeBlack} />
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Email is invalid',
                    },
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.email?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'password' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box
                      borderWidth={1}
                      borderColor={COLORS.cgColor}
                      borderRadius={10}
                      mt={5}>
                      <Input
                        placeholder="Password"
                        variant={'unstyled'}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        fontSize={14}
                        type={'password'}
                        borderRadius={10}
                        secureTextEntry={showPassword ? true : false}
                        InputRightElement={
                          <Box mr={2}>
                            {showPassword ? (
                              <ICONS.EyeClose
                                size={22}
                                color={COLORS.fadeBlack}
                                onPress={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <ICONS.Eye
                                size={22}
                                color={COLORS.fadeBlack}
                                onPress={() => setShowPassword(!showPassword)}
                              />
                            )}
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  name="password"
                  rules={{
                    required: 'Password is required',
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.password?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={'confirmPassword' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box
                      borderWidth={1}
                      borderColor={COLORS.cgColor}
                      borderRadius={10}
                      mt={5}>
                      <Input
                        placeholder="Confirm Password"
                        variant={'unstyled'}
                        fontSize={14}
                        type={'password'}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        borderRadius={10}
                        secureTextEntry={showConfirmPassword ? true : false}
                        InputRightElement={
                          <Box mr={2}>
                            {showConfirmPassword ? (
                              <ICONS.EyeClose
                                size={22}
                                color={COLORS.fadeBlack}
                                onPress={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              />
                            ) : (
                              <ICONS.Eye
                                size={22}
                                color={COLORS.fadeBlack}
                                onPress={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                              />
                            )}
                          </Box>
                        }
                      />
                    </Box>
                  )}
                  name="confirmPassword"
                  rules={{
                    required: 'Confirm Password is required',
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return 'Your passwords do no match';
                      }
                    },
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.confirmPassword?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <Pressable onPress={handleSubmit(onSubmit)}>
                <Box
                  bg={COLORS.cgColor}
                  borderRadius={10}
                  alignItems={'center'}
                  mt={4}>
                  <Text color={COLORS.textWhite} bold py={2} letterSpacing={1}>
                    Sign Up
                  </Text>
                </Box>
              </Pressable>
            </Box>
            <Pressable mt={5} onPress={() => navigation.navigate('Login')}>
              <Row space={1} justifyContent={'center'}>
                <Text bold fontSize={15}>
                  Already have an Account ?{' '}
                </Text>
                <Text underline bold color={COLORS.cgColor} fontSize={15}>
                  Sign In
                </Text>
              </Row>
            </Pressable>

            <Pressable mt={5} onPress={() => {}} alignItems={'center'}>
              <Text underline color={COLORS.cgColor} fontSize={15}>
                Continue as guest
              </Text>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
      {/* Modal */}
      <SuccessModal setShowModal={setShowModal} showModal={showModal} />
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        showErrorModal={showErrorModal}
        label={label}
      />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
