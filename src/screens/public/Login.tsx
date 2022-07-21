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
  Spinner,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import {ICONS, LoginBg, LOGO} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';
import {Controller, useForm} from 'react-hook-form';
import {useAccessToken, useIsMounted} from 'hooks';
import {post} from 'api';
import {ErrorModal} from 'components/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from 'app';
import {VerifyEmailModal} from 'components';

type DATATYPE = {
  email?: string;
  password?: string;
};

const Login = () => {
  const navigation = useNavigation<PublicNavigation>();
  const [loader, setLoader] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const isMounted = useIsMounted();
  const {setUser, user} = useAuth();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [label, setLabel] = useState();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {setAccessToken, accessToken} = useAccessToken();
  console.log({user});
  const onSubmit = async (data: DATATYPE) => {
    try {
      isMounted.current && setLoader(true);
      const loginData = await post({
        path: 'auth/login',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        token: accessToken,
      });
      if (loginData.status === 500) {
        setShowErrorModal(true);
        setLabel(loginData.error);
        return;
      }
      // console.log({loginData});
      await AsyncStorage.setItem('tokenId', loginData.REFRESH_TOKEN);
      setAccessToken(loginData.ACCESS_TOKEN);
      setUser(loginData.data);
    } catch (error) {
      if (error instanceof Error) return Alert.alert('Error', error.message);
      return Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView keyboardShouldPersistTaps="always">
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
            <Box mt={5}>
              <Heading>Login</Heading>
              <Text bold color={COLORS.grey} mt={2} mb={2}>
                Login or Create account quickly to manage your orders
              </Text>

              <FormControl isRequired isInvalid={'email' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box
                      borderWidth={1}
                      borderColor={COLORS.cgcolor}
                      borderRadius={10}
                      mt={3}>
                      <Input
                        placeholder="Email Address"
                        variant={'unstyled'}
                        fontSize={14}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        borderColor={COLORS.cgcolor}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        InputRightElement={
                          <Box mr={2}>
                            <ICONS.Email size={20} color={COLORS.cgcolor} />
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

              <FormControl isRequired isInvalid={'password' in errors} mt={2}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box
                      borderWidth={1}
                      borderColor={COLORS.cgcolor}
                      borderRadius={10}
                      mt={4}>
                      <Input
                        placeholder="Password"
                        variant={'unstyled'}
                        fontSize={14}
                        type={'password'}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        secureTextEntry={showPassword ? true : false}
                        InputRightElement={
                          <Box mr={2}>
                            {showPassword ? (
                              <ICONS.EyeClose
                                size={22}
                                color={COLORS.cgcolor}
                                onPress={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <ICONS.Eye
                                size={22}
                                color={COLORS.cgcolor}
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
              <Row justifyContent={'space-between'} mt={1}>
                <Pressable onPress={() => setShowEmailModal(true)}>
                  <Box mt={1}>
                    <Text color={COLORS.grey} bold>
                      Verify Email ?
                    </Text>
                  </Box>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Box mt={1}>
                    <Text color={COLORS.grey} bold>
                      Forgot Password ?
                    </Text>
                  </Box>
                </Pressable>
              </Row>
              <Pressable onPress={handleSubmit(onSubmit)} mt={2}>
                <Row
                  bg={!loader ? COLORS.cgcolor : COLORS.grey}
                  borderRadius={10}
                  justifyContent={'center'}
                  alignItems={'center'}
                  mt={3}>
                  {loader ? (
                    <Spinner size={'lg'} color={COLORS.textWhite} />
                  ) : (
                    <Text
                      color={COLORS.textWhite}
                      bold
                      py={2}
                      letterSpacing={1}>
                      Sign In
                    </Text>
                  )}
                </Row>
              </Pressable>
            </Box>
            <Pressable mt={5} onPress={() => navigation.navigate('Register')}>
              <Row space={1} justifyContent={'center'}>
                <Text bold fontSize={15}>
                  If you are new,{' '}
                </Text>
                <Text underline bold color={COLORS.cgcolor} fontSize={15}>
                  Create Now
                </Text>
              </Row>
            </Pressable>

            <Pressable
              mt={5}
              // onPress={() => setIsLoggedIn(true)}
            >
              <Row justifyContent={'center'}>
                <Text fontSize={15} underline>
                  Continue as guest
                </Text>
              </Row>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
      {/* Error Modal */}
      <ErrorModal
        setShowErrorModal={setShowErrorModal}
        label={label}
        showErrorModal={showErrorModal}
      />
      {/* Modal */}
      <VerifyEmailModal
        setShowEmailModal={setShowEmailModal}
        showEmailModal={showEmailModal}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
