import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import {Controller, useForm} from 'react-hook-form';
import {COLORS} from 'configs';
import LottieView from 'lottie-react-native';
import {SUPPORT} from 'assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {post} from 'api';

import AsyncStorage from '@react-native-async-storage/async-storage';

type supportType = {
  Name?: string;
  Email?: string;
  Subject?: string;
  Message?: string;
  phoneNumber?: string;
};

const SupportUs = () => {
  const [loader, setLoader] = React.useState(false);
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data: supportType) => {
    try {
      setLoader(true);
      const token = await AsyncStorage.getItem('access_token');
      const supportData = await post({
        path: 'support-form',
        body: JSON.stringify({
          name: data.Name,
          email: data.Email,
          phoneNumber: data.phoneNumber,
          subject: data.Subject,
          message: data.Message,
        }),
        token: token,
      });
      console.log(supportData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
      reset();
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar backgroundColor={'#3d34d8'} barStyle="light-content" /> */}

      <ScrollView
        bg={COLORS.textWhite}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <Box px={'4'}>
          <Center h={300}>
            <Box h={280} w={'full'}>
              <LottieView source={SUPPORT} autoPlay loop={true} />
            </Box>
            <Heading textAlign={'center'} size={'sm'} fontSize={'18'} mt={'1'}>
              Out Support Team is here to help you
            </Heading>
          </Center>
          <Stack mt={5}>
            <FormControl isRequired isInvalid={'Name' in errors}>
              <FormControl.Label>Enter Name</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    InputLeftElement={
                      <Ionicons
                        name="person-outline"
                        size={20}
                        style={styles.supportIcons}
                      />
                    }
                    placeholder="John"
                    fontSize={'14'}
                    // mb={4}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="Name"
                rules={{
                  required: 'Name is required',
                  minLength: {value: 3, message: 'Min length is 3'},
                  maxLength: {value: 20, message: 'Max length is 20'},
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mt={0} mb={2}>
                {errors.Name?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={'Email' in errors}>
              <FormControl.Label>Enter Email</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    InputLeftElement={
                      <Ionicons
                        size={20}
                        style={styles.supportIcons}
                        name="mail-open-outline"
                      />
                    }
                    placeholder="john@gmail.com"
                    fontSize={'14'}
                    // mb={4}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="Email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Email is invalid',
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mb={2} mt={0}>
                {errors.Email?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={'phoneNumber' in errors}>
              <FormControl.Label>Enter Number</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    InputLeftElement={
                      <Ionicons
                        size={20}
                        style={styles.supportIcons}
                        name="phone-portrait-outline"
                      />
                    }
                    placeholder="1234567890"
                    fontSize={'14'}
                    // mb={4}
                    keyboardType="numeric"
                    // type=''
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phoneNumber"
                rules={{
                  required: 'Phone Number is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mb={2} mt={0}>
                {errors.phoneNumber?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={'Subject' in errors}>
              <FormControl.Label>Enter Subject</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    InputLeftElement={
                      <Ionicons
                        size={20}
                        style={styles.supportIcons}
                        name="reader-outline"
                      />
                    }
                    placeholder="Subject"
                    fontSize={'14'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="Subject"
                rules={{
                  required: 'Subject is required',
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mb={2} mt={0}>
                {errors.Subject?.message}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={'Message' in errors}>
              <FormControl.Label>Enter Messages</FormControl.Label>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    textAlignVertical="top"
                    multiline
                    numberOfLines={4}
                    placeholder="Your messages"
                    fontSize={'14'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="Message"
                rules={{
                  required: 'Message is required',
                  maxLength: {value: 1000, message: 'Max length is 20'},
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage mt={0}>
                {errors.Message?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <Box mt={2}>
              <TouchableOpacity
                style={styles.sends_Touch}
                onPress={handleSubmit(onSubmit)}>
                <Box style={styles.send_container}>
                  {loader ? (
                    <ActivityIndicator
                      size="small"
                      color={COLORS.textWhite}
                      style={styles.SendUs}
                    />
                  ) : (
                    <Text style={styles.SendUs}>SEND US</Text>
                  )}
                </Box>
              </TouchableOpacity>
            </Box>
          </Stack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportUs;

const styles = StyleSheet.create({
  supportIcons: {
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  SendUs: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 4,
  },

  sends_Touch: {
    marginTop: 7,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  send_container: {
    paddingVertical: 4,
  },
});
