import ImgCropPicker from 'react-native-image-crop-picker';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from './BottomSheet';
import {Button} from 'native-base';
import {BASE_URL} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  visible?: boolean;
  onDismiss?: any;
  setImageURI?: any;
  postImage?: any;
  cropperCircleOverlay?: boolean;
  postImages?: any;
}
const ImagePicker = ({
  visible,
  onDismiss,
  setImageURI,
  cropperCircleOverlay,
}: Props) => {
  const postImg = async (img: string) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const imageData = new FormData();
      imageData.append('avatar', {
        uri: img,
        name: 'image.png',
        fileName: 'image',
        type: 'image/png',
      });
      let res = await fetch(`${BASE_URL}/user/account`, {
        method: 'put',
        body: imageData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      let response = await res.json();
    } catch (error) {
      console.log('err', error);
    }
  };
  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
      quality: 0.25,
      maxWidth: 2000,
      maxHeight: 2000,
      mediaType: 'photo',
    };
    ImgCropPicker.openPicker({
      options,
      cropping: true,
      cropperCircleOverlay,
    }).then(res => {
      console.log({res});
      setImageURI(res.path);
      // postImages ? postImage(res.path) : null;
      postImg(res.path);
      onDismiss();
    });
  };
  const handleTakePhoto = () => {
    const options = {
      noData: true,
      quality: 0.25,
      maxWidth: 5000,
      maxHeight: 1000,
      mediaType: 'photo',
    };
    ImgCropPicker.openCamera({
      options,
      cropping: true,
      cropperCircleOverlay,
    })
      .then(res => {
        setImageURI(res.path);
        postImg(res.path);
        onDismiss();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <BottomSheet visible={visible} onDismiss={onDismiss}>
        <Text style={styles.uploadText}>Upload Photo</Text>
        <View style={styles.gallery}>
          <Button onPress={handleChoosePhoto} bg={'green.700'}>
            Gallery
          </Button>
        </View>
        <View style={styles.camera}>
          <Button onPress={handleTakePhoto} bg={'green.700'}>
            Camera
          </Button>
        </View>
      </BottomSheet>
    </>
  );
};
export default ImagePicker;

const styles = StyleSheet.create({
  uploadText: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 6,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Nunito-Bold',
  },
  gallery: {
    marginTop: 10,
  },
  camera: {
    marginTop: 12,
  },
});

// upload img

// const postImg = async (img: string) => {
//   try {
//     const imageData = new FormData();
//     imageData.append('avatar', {
//       uri: img,
//       name: 'image.png',
//       fileName: 'image',
//       type: 'image/png',
//     });
//     let res = await fetch(`${BASE_URL}/account`, {
//       method: 'put',
//       body: imageData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${currentUserData?.token}`,
//       },
//     });
//     let response = await res.json();

//     setImageUrl(response.uploadedFiles[0].url);
//     setImagePath(response.uploadedFiles[0].path);
//   } catch (error) {
//     console.log('err', error);
//   }
// };
// const handleChoosePhoto = async () => {
//   ImgCropPicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true,
//   }).then(res => {
//     console.log(res);
//     setImageUri(res.path);
//     postImg(res?.path);
//     onClose();
//   });
// };

// const handleTakePhoto = () => {
//   const options = {
//     noData: true,
//     quality: 0.25,
//     maxWidth: 5000,
//     maxHeight: 1000,
//     mediaType: 'photo',
//   };
//   ImgCropPicker.openCamera({
//     options,
//     cropping: true,
//   })
//     .then(res => {
//       setImageUri(res.path);
//       postImg(res?.path);
//       onClose();
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
