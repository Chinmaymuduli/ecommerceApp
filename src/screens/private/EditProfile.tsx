import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
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
import {ImagePicker} from 'components/core';
import {Controller, useForm} from 'react-hook-form';

type Prop3 = {
  mobileData: {
    MobileNumber?: string;
  };
};

const EditProfile = () => {
  const navigation = useNavigation<NavigationProps>();
  const [visiable, setVisiable] = useState<boolean>(false);
  const [profileIimage, setprofileimage] = useState<any>('');
  const [gender, setGender] = useState<string>('Male');

  const handleDismiss = () => {
    setVisiable(false);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const {
    control: control2,
    formState: {errors: errors2},
    handleSubmit: handleSubmit2,
  } = useForm();

  const {
    control: control3,
    formState: {errors: errors3},
    handleSubmit: handleSubmit3,
  } = useForm();

  const onSubmit = async (data: any) => {
    const EditProfileData = {
      ...data,
      gender: gender,
    };
    try {
      console.log('object', EditProfileData);
    } catch (error) {
      console.log('object', error);
    }
  };

  const emailSubmit = async (emaildata: any) => {
    try {
      console.log('data', emaildata);
    } catch (error) {
      console.log(error);
    }
  };

  const handelMobileUpdate = async (mobileData: any) => {
    console.log(mobileData);
  };
  return (
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
                  uri: profileIimage
                    ? profileIimage
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
          <FormControl isRequired isInvalid={'firstName' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Box>
                  <Input
                    placeholder="First Name"
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
              name="firstName"
              rules={{
                required: 'First Name is required',
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.firstName?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'LastName' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Box mt={3}>
                  <Input
                    placeholder="Last Name"
                    variant={'underlined'}
                    fontSize={15}
                    h={10}
                    bgColor={COLORS.textWhite}
                    borderColor={COLORS.fadeBlack}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Box>
              )}
              name="LastName"
              rules={{
                required: 'Last Name is required',
              }}
              defaultValue=""
            />
            <FormControl.ErrorMessage mt={0}>
              {errors.LastName?.message}
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
              defaultValue="Male"
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
                <Radio value="Male" colorScheme="green" size="sm" my={1}>
                  Male
                </Radio>
                <Radio value="Female" colorScheme="green" size="sm" my={1}>
                  Female
                </Radio>
              </Stack>
            </Radio.Group>

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
            <FormControl isRequired isInvalid={'MobileNumber' in errors2}>
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
            </FormControl>

            <FormControl isRequired isInvalid={'EmailId' in errors3}>
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
                name="EmailId"
                rules={{
                  required: 'Email Id is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mt={0}>
                {errors3.EmailId?.message}
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
          <Pressable
            py={2}
            onPress={() => navigation.navigate('ChangePassword')}>
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
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
