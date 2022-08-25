import {useCallback, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {post, put} from 'api';

const useFCMToken = () => {
  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }, []);
  const getFCMToken = useCallback(async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (!fcmToken) return console.log("user doesn't have a device token yet");
      // console.log('FCM Token:', fcmToken);
      // await post({
      //   path: "push-notification",
      //   body: JSON.stringify({
      //     FCM: fcmToken,
      //     title: "Good AfterNoon🕑",
      //     message: "click hear to found out more 👆"
      //   })
      // })
      await put({
        path: 'user/account',
        body: JSON.stringify({
          fcmTokens: {
            android: fcmToken,
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('message ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [getFCMToken, requestUserPermission]);
};

export default useFCMToken;
