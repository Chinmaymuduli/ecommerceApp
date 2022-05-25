import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
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
  Text,
} from 'native-base';
import {COLORS} from 'configs';
import {GOOGLE, ICONS, LoginBg, LOGO, PHONE} from 'assets';
import {useNavigation} from '@react-navigation/native';
import {PublicNavigation} from 'src/routes/PublicRoutes';
import {Controller, useForm} from 'react-hook-form';

type REGISTERDATA = {
  email?: string;
  password?: string;
  name?: string;
};
const Register = () => {
  const navigation = useNavigation<PublicNavigation>();
  const [loader, setLoader] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = async (data: REGISTERDATA) => {
    try {
      setLoader(true);
      console.log('object', data);
    } catch (error) {
      console.log('object', error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
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
                      borderColor={COLORS.cgcolor}
                      // borderRadius={6}
                      borderRadius={10}
                      mt={3}>
                      <Input
                        placeholder="Full Name"
                        variant={'unstyled'}
                        fontSize={14}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        // bgColor={'#EEEEEE'}
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
                      borderColor={COLORS.cgcolor}
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
                        // bgColor={'#EEEEEE'}
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
                      borderColor={COLORS.cgcolor}
                      borderRadius={10}
                      mt={5}>
                      <Input
                        placeholder="Password"
                        variant={'unstyled'}
                        fontSize={14}
                        type={'password'}
                        // bgColor={'#EEEEEE'}
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
              <Pressable onPress={handleSubmit(onSubmit)}>
                <Box
                  bg={COLORS.cgcolor}
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
                <Text underline bold color={COLORS.cgcolor} fontSize={15}>
                  Sign In
                </Text>
              </Row>
            </Pressable>

            <Pressable mt={5} onPress={() => {}} alignItems={'center'}>
              {/* <Row space={1} justifyContent={'center'}> */}

              <Text underline color={COLORS.cgcolor} fontSize={15}>
                Continue as guest
              </Text>
              {/* </Row> */}
            </Pressable>
            {/* <HStack alignItems={'center'} mt={4}>
              <Box
                w={'33%'}
                borderWidth={1}
                bg={COLORS.lightGrey}
                borderStyle={'dashed'}></Box>
              <Text bold color={COLORS.cgcolor} mx={2}>
                Or login with
              </Text>
              <Box
                w={'34%'}
                borderWidth={1}
                bg={COLORS.lightGrey}
                borderStyle={'dashed'}></Box>
            </HStack>

            <Box mt={4} mb={3}>
              <Pressable bg={'#EEEEEE'}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'center'}
                  space={3}
                  py={2}>
                  <Image alt="image" w={4} h={4} source={GOOGLE} />
                  <Text bold>Continue With Google</Text>
                </HStack>
              </Pressable>
              <Pressable bg={'#EEEEEE'} mt={3}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'center'}
                  space={2}
                  mr={2}
                  py={2}>
                  <Image alt="image" w={6} h={6} source={PHONE} />
                  <Text bold>Continue With Phone</Text>
                </HStack>
              </Pressable>
            </Box> */}
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
