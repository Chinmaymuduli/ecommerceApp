// import {io, Socket} from 'socket.io-client';
// import {auth, database} from 'configs';
import {useEffect, useRef} from 'react';
// import {storeFCMToken} from 'utils';
import {AGORA_API} from 'api';
import {AppState} from 'react-native';
import {useAuth} from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAppLoad() {
  const {setUser} = useAuth(state => state);
  // listen to the user's auth state and set the user
  //   useEffect(() => {
  //     auth().onAuthStateChanged(currentUser => {
  //       // If no user is logged in, set the user to {}
  //       if (!currentUser) return setUser({});
  //       socketRef.current = io(`${AGORA_API}/onlineOffline`);
  //       socketRef.current.on('connect', () => {
  //         socketRef?.current?.emit('one-member-online', {
  //           userUid: currentUser?.uid,
  //         });
  //       });
  //       database()
  //         .ref(`users/${currentUser.uid}`)
  //         .on('value', snap => {
  //           if (!snap.exists()) return setUser({});
  //           // If a user is logged in, set the user to the user's data
  //           setUser(snap.val());
  //           // Store the user's FCM token in the database
  //           storeFCMToken(`users/${currentUser.uid}/fcmTokens`);
  //         });
  //     });
  //     return () => {
  //       socketRef.current?.disconnect();
  //     };

  //   }, []);
  useEffect(() => {
    (async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const userJSON = JSON.parse(userStr || `{}`);
        console.log({userJSON});
        setTimeout(async () => {
          await setUser(userJSON);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {};
}
