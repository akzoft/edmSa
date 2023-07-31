import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { RootNavigation, Store } from './src/libs'
import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'
import { requestUserPermission } from './src/libs/others/functions'
import PushNotification from "react-native-push-notification";
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  const [title, settitle] = useState<any>('');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  //configuration de la notification
  useEffect(() => {
    requestUserPermission()

    const unsubscribe = messaging().onMessage(remoteMessage => {
      const notif = remoteMessage.notification
      settitle(notif?.title)

      Alert.alert(notif?.title || "Notifications", notif?.body, [{ text: "D'accord" }])
    })

    PushNotification.configure({
      onNotification: function (notification) {
        const msg = notification?.message?.toString();
        const ok = notification?.data?.from?.split('/')[2]
        if (msg === undefined && ok === 'EDM_News') Store.dispatch({ type: 'edm_news', payload: undefined })
        if (msg === undefined && ok === 'EDM_Actus') Store.dispatch({ type: 'edm_actus', payload: undefined })
        msg !== undefined && Alert.alert("Notifications", msg, [{ text: "D'accord" }])
      },
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      const notifs = remoteMessage.notification;

      // Show a local notification
      PushNotification.localNotification({
        title: notifs?.title || 'Notification Title',
        message: notifs?.body || 'Notification Body',
      });
    })

    return unsubscribe
  }, [])

  //fixer la rotatiion en mode portrait
  useEffect(() => {
    Orientation.lockToPortrait(); // Verrouille l'orientation en mode portrait

    return () => {
      Orientation.unlockAllOrientations(); // Déverrouille toutes les orientations à la fermeture du composant
    };
  }, []);


  useEffect(() => {
    if (title?.includes('reussi')) {
      let success = 'reussi'
      AsyncStorage.setItem('notif', JSON.stringify(success)).then(ans => console.log(ans)).catch(err => console.log(err))
      Store.dispatch({ type: 'receive_notif', payload: success })
      console.log(success)
    } else
      if (title?.includes('échoué')) {
        let fail = 'échoué'
        AsyncStorage.setItem('notif', JSON.stringify(fail)).then(ans => console.log(ans)).catch(err => console.log(err))
        Store.dispatch({ type: 'receive_notif', payload: fail })
        console.log(fail)
      } else {
        let pending = 'pending'
        AsyncStorage.setItem('notif', JSON.stringify(pending)).then(ans => console.log(ans)).catch(err => console.log(err))
        Store.dispatch({ type: 'receive_notif', payload: pending })
      }
  }, [title]);

  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  )
}

export default App


//échoué
//reussi
