import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  Heading,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import {resetImg} from 'assets';
import {COLORS} from 'configs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  return (
    <Box bg={COLORS.textWhite} flex={1}>
      {/* <Pressable p={4}>
        <Ionicons name="arrow-back" size={28} color={COLORS.fadeBlack} />
      </Pressable> */}
      <ScrollView>
        <Center mt={10}>
          <Image
            alt="resetImg"
            source={resetImg}
            style={{
              height: 300,
              width: 300,
            }}
          />
        </Center>
        <Box px={5}>
          <Heading fontSize={30}>Reset</Heading>
          <Heading fontSize={30}>Password</Heading>
          <Box mt={5}>
            <Input
              placeholder="New Password"
              fontSize={15}
              variant="underlined"
              secureTextEntry={showPassword ? false : true}
              pl={3}
              InputRightElement={
                <>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={25}
                    color={COLORS.fadeBlack}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </>
              }
            />
            <Input
              mt={6}
              placeholder="Confirm Password"
              fontSize={15}
              variant="underlined"
              secureTextEntry={confirmPassword ? false : true}
              pl={3}
              InputRightElement={
                <>
                  <Ionicons
                    name={confirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={25}
                    color={COLORS.fadeBlack}
                    onPress={() => setConfirmPassword(!confirmPassword)}
                  />
                </>
              }
            />
          </Box>
          <Pressable mt={10}>
            <Box bg={'#92E3A9'} borderRadius={5}>
              <Text py={2} textAlign={'center'} bold letterSpacing={1}>
                Reset Password
              </Text>
            </Box>
          </Pressable>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
