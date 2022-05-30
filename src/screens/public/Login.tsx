import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Pressable,
  Row,
  ScrollView,
  Spinner,
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import {GOOGLE, ICONS, LoginBg, LOGO, PHONE} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';
import {Controller, useForm} from 'react-hook-form';

type DATATYPE = {
  email?: string;
  password?: string;
};

const Login = () => {
  const navigation = useNavigation<PublicNavigation>();
  const [loader, setLoader] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = async (data: DATATYPE) => {
    try {
      setLoader(true);
    } catch (error) {
      console.log('object', error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView keyboardShouldPersistTaps="always">
        {/* <Box bg={COLORS.cgcolor} h={150}>
          <Pressable alignItems={'flex-end'} px={3} py={3}>
            <Heading color={COLORS.textWhite} size={'md'}>
              Skip
            </Heading>
          </Pressable>
        </Box> */}
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
                        // bgColor={COLORS.textWhite}
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
              {/* </Box> */}

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
              <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                <Box alignItems={'flex-end'} mt={2}>
                  <Text color={COLORS.grey}>Forgot Password ?</Text>
                </Box>
              </Pressable>
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

            <Pressable mt={5} onPress={() => {}}>
              <Row justifyContent={'center'}>
                <Text fontSize={15} underline>
                  Continue as guest
                </Text>
              </Row>
            </Pressable>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
