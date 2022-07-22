import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  HStack,
  Text,
  Image,
  Input,
  Pressable,
  Heading,
  Radio,
  Stack,
  FormControl,
  ScrollView,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {FetchLoader, ImagePicker} from 'components/core';
import {Controller, useForm} from 'react-hook-form';
import {useAccessToken, useActions, useFetch, useIsMounted} from 'hooks';
import {User} from 'types';
import {post, put} from 'api';
import {useAuth} from 'app';

const EditProfile = () => {
  const {data, isLoading} = useFetch<User>('user');
  console.log({data});
  const navigation = useNavigation<NavigationProps>();
  const [visiable, setVisiable] = useState<boolean>(false);
  const [profileIimage, setprofileimage] = useState<any>('');
  const [gender, setGender] = useState<string>();
  const {accessToken} = useAccessToken();
  const isMounted = useIsMounted();
  const {setLoading} = useActions();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  useEffect(() => {
    setValue('displayName', data?.results?.displayName);
    setValue('phoneNumber', `${data?.results?.phoneNumber}`);
    setValue3('email', data?.results?.email);
    setGender(data?.results.gender);
  }, [data?.results]);

  const handleDismiss = () => {
    setVisiable(false);
  };

  const {
    control: control3,
    formState: {errors: errors3},
    handleSubmit: handleSubmit3,
    setValue: setValue3,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      isMounted.current && setLoading(true);
      const nameResponse = await put({
        path: 'user/account',
        body: JSON.stringify({
          displayName: data?.displayName,
          gender: gender,
          phoneNumber: data?.phoneNumber,
        }),
        token: accessToken,
      });
      console.log({nameResponse});
    } catch (error) {
      console.log('object', error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  const emailSubmit = async (emaildata: any) => {
    try {
      console.log('data', emaildata);
    } catch (error) {
      console.log(error);
    }
  };

  const handelChangePassword = async () => {
    try {
      const sendOtp = await post({
        path: 'auth/forgot-password',
        body: JSON.stringify({
          email: data?.results.email,
        }),
      });
      console.log({sendOtp});
      navigation.navigate('ChangePassword');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!isLoading ? (
        <Box flex={1} bg={COLORS.textWhite}>
          <ScrollView>
            <Box bg={COLORS.cgcolor}>
              <HStack justifyContent={'space-between'} px={5} py={3}>
                <HStack space={4} alignItems={'center'}>
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color={COLORS.textWhite}
                    onPress={() => navigation.goBack()}
                  />
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
            <Box bg={COLORS.cgcolor} h={150}>
              <Pressable onPress={() => setVisiable(true)}>
                <Center mt={5}>
                  <Image
                    source={{
                      uri: data?.results?.photoURL
                        ? data?.results?.photoURL
                        : 'https://www.w3schools.com/howto/img_avatar.png',
                    }}
                    h={100}
                    w={100}
                    alt={'profileimg'}
                    borderRadius={50}
                  />
                  <Box
                    bg={COLORS.textWhite}
                    borderRadius={20}
                    position={'absolute'}
                    right={127}
                    bottom={2}>
                    <Ionicons
                      name="camera"
                      size={20}
                      color={COLORS.fadeBlack}
                      style={{
                        padding: 3,
                      }}
                    />
                  </Box>
                </Center>
              </Pressable>
            </Box>
            <Box px={4} mt={4}>
              <FormControl isRequired isInvalid={'displayName' in errors}>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Box>
                      <Input
                        placeholder="Display Name"
                        variant={'underlined'}
                        fontSize={15}
                        bgColor={COLORS.textWhite}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        borderColor={COLORS.fadeBlack}
                      />
                    </Box>
                  )}
                  name="displayName"
                  rules={{
                    required: 'Name is required',
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage mt={0}>
                  {errors.displayName?.message}
                </FormControl.ErrorMessage>
              </FormControl>

              <Box mt={3}>
                <Text fontSize={15} bold>
                  Gender :
                </Text>
                <Radio.Group
                  value={gender}
                  onChange={gen => setGender(gen)}
                  mt={2}
                  name="exampleGroup"
                  defaultValue={gender}
                  accessibilityLabel="pick a size">
                  <Stack
                    direction={{
                      base: 'row',
                      md: 'row',
                    }}
                    alignItems={{
                      base: 'flex-start',
                      md: 'center',
                    }}
                    space={5}
                    w="75%"
                    maxW="300px">
                    <Radio value="MALE" colorScheme="green" size="sm" my={1}>
                      Male
                    </Radio>
                    <Radio value="FEMALE" colorScheme="green" size="sm" my={1}>
                      Female
                    </Radio>
                  </Stack>
                </Radio.Group>

                <FormControl
                  isRequired
                  isInvalid={'phoneNumber' in errors}
                  mt={5}>
                  <Controller
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Mobile Number"
                        variant={'underlined'}
                        fontSize={15}
                        h={10}
                        borderColor={COLORS.fadeBlack}
                        keyboardType={'numeric'}
                        bgColor={COLORS.textWhite}
                      />
                    )}
                    name="phoneNumber"
                    rules={{
                      required: 'Mobile Number is required',
                    }}
                    defaultValue=""
                  />
                  <FormControl.ErrorMessage mt={0}>
                    {errors.phoneNumber?.message}
                  </FormControl.ErrorMessage>
                </FormControl>

                <Pressable
                  alignItems={'center'}
                  mt={10}
                  onPress={handleSubmit(onSubmit)}>
                  <Heading size={'sm'} color={'green.700'}>
                    SUBMIT
                  </Heading>
                </Pressable>
              </Box>

              <Box mt={5}>
                {/* <FormControl isRequired isInvalid={'MobileNumber' in errors2}>
              <Controller
                control={control2}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Mobile Number"
                    variant={'underlined'}
                    fontSize={15}
                    h={10}
                    borderColor={COLORS.fadeBlack}
                    keyboardType={'numeric'}
                    bgColor={COLORS.textWhite}
                    InputRightElement={
                      <Pressable onPress={handleSubmit2(handelMobileUpdate)}>
                        <Text bold color={'green.700'}>
                          Update
                        </Text>
                      </Pressable>
                    }
                  />
                )}
                name="MobileNumber"
                rules={{
                  required: 'Mobile Number is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mt={0}>
                {errors2.MobileNumber?.message}
              </FormControl.ErrorMessage>
            </FormControl> */}

                <FormControl isRequired isInvalid={'email' in errors3}>
                  <Controller
                    control={control3}
                    render={({field: {onChange, onBlur, value}}) => (
                      <Box mt={4}>
                        <Input
                          placeholder="Email ID"
                          variant={'underlined'}
                          fontSize={15}
                          h={10}
                          borderColor={COLORS.fadeBlack}
                          bgColor={COLORS.textWhite}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          // onChangeText={em => setUserEmail(em)}
                          // value={userEmail}
                          keyboardType={'email-address'}
                          autoCapitalize={'none'}
                          InputRightElement={
                            <Pressable onPress={handleSubmit3(emailSubmit)}>
                              <Text bold color={'green.700'}>
                                Update
                              </Text>
                            </Pressable>
                          }
                        />
                      </Box>
                    )}
                    name="email"
                    rules={{
                      required: 'Email Id is required',
                    }}
                    defaultValue=""
                  />
                  <FormControl.ErrorMessage mt={0}>
                    {errors3.email?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
              </Box>
            </Box>
            <Box
              px={5}
              borderBottomWidth={1}
              borderTopWidth={1}
              mt={9}
              borderColor={COLORS.lightGrey}>
              <Pressable py={2} onPress={handelChangePassword}>
                <Text fontSize={16} py={2}>
                  Change Password
                </Text>
              </Pressable>
            </Box>
          </ScrollView>
          {/* image */}
          <ImagePicker
            visible={visiable}
            onDismiss={handleDismiss}
            setImageURI={setprofileimage}
            cropperCircleOverlay={true}
            postImages={false}
          />
        </Box>
      ) : (
        <FetchLoader />
      )}
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
