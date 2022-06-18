import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Box, Center, HStack, Text, Image, Input, Pressable} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'configs';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'src/routes/PrivateRoutes';
import {ImagePicker} from 'components/core';

const EditProfile = () => {
  const navigation = useNavigation<NavigationProps>();
  const [visiable, setVisiable] = useState<boolean>(false);
  const [profileIimage, setprofileimage] = useState<any>('');
  const handleDismiss = () => {
    setVisiable(false);
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
      <Box px={4} mt={2}>
        <Box borderBottomWidth={1} borderRadius={5}>
          <Input
            placeholder="First Name"
            variant={'unstyled'}
            fontSize={15}
            h={10}
            bgColor={COLORS.textWhite}
          />
        </Box>

        <Box borderBottomWidth={1} borderRadius={5} mt={5}>
          <Input
            placeholder="Last Name"
            variant={'unstyled'}
            fontSize={15}
            h={10}
            bgColor={COLORS.textWhite}
          />
        </Box>

        <Box borderBottomWidth={1} borderRadius={5} mt={5}>
          <Input
            placeholder="Mobile Number"
            variant={'unstyled'}
            fontSize={15}
            h={10}
            bgColor={COLORS.textWhite}
          />
        </Box>

        <Box borderBottomWidth={1} borderRadius={5} mt={5}>
          <Input
            placeholder="Email ID"
            variant={'unstyled'}
            fontSize={15}
            h={10}
            bgColor={COLORS.textWhite}
          />
        </Box>

        <Box bg={COLORS.cgcolor} borderRadius={4} mt={10}>
          <Text
            color={COLORS.textWhite}
            bold
            fontSize={16}
            py={2}
            textAlign={'center'}>
            Update
          </Text>
        </Box>
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
