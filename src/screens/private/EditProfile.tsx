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
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {ImagePicker} from 'components/core';
import {Controller, useForm} from 'react-hook-form';

const EditProfile = () => {
  const navigation = useNavigation<NavigationProps>();
  const [visiable, setVisiable] = useState<boolean>(false);
  const [profileIimage, setprofileimage] = useState<any>('');
  const handleDismiss = () => {
    setVisiable(false);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log('object', data);
    } catch (error) {
      console.log('object', error);
    }
  };

  const emailSubmit = async (data: any) => {
    console.log(data);
  };

  const mobileSubmit = async (data: any) => {
    console.log(data);
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
                  onChange={onChange}
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
        </Box>
        <Pressable
          alignItems={'center'}
          mt={10}
          onPress={handleSubmit(onSubmit)}>
          <Heading size={'sm'} color={'green.700'}>
            SUBMIT
          </Heading>
        </Pressable>
        <Box mt={5}>
          <FormControl isRequired isInvalid={'MobileNumber' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Mobile Number"
                  variant={'underlined'}
                  fontSize={15}
                  h={10}
                  borderColor={COLORS.fadeBlack}
                  bgColor={COLORS.textWhite}
                  InputRightElement={
                    <Pressable onPress={handleSubmit(mobileSubmit)}>
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
              {errors.MobileNumber?.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={'EmailId' in errors}>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Box mt={4}>
                  <Input
                    placeholder="Email ID"
                    variant={'underlined'}
                    fontSize={15}
                    h={10}
                    borderColor={COLORS.fadeBlack}
                    bgColor={COLORS.textWhite}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    InputRightElement={
                      <Pressable onPress={handleSubmit(emailSubmit)}>
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
              {errors.EmailId?.message}
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
        <Pressable py={2} onPress={() => navigation.navigate('ChangePassword')}>
          <Text fontSize={16} py={2}>
            Change Password
          </Text>
        </Pressable>
      </Box>
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
