import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { RootNavigation, Store } from './src/libs'
import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'
import { requestUserPermission } from './src/libs/others/functions'
import PushNotification from "react-native-push-notification";
import Orientation from 'react-native-orientation-locker';

const App = () => {

  //configuration de la notification
  useEffect(() => {
    requestUserPermission()

    const unsubscribe = messaging().onMessage(remoteMessage => {
      const notif = remoteMessage.notification
      const data = remoteMessage.data
      Alert.alert("Notifications", notif?.body, [{ text: "D'accord" }])
    })

    PushNotification.configure({
      onNotification: function (notification) {
        const msg = notification.message;
        Alert.alert("Notifications", msg.toString(), [{ text: "D'accord" }])
        console.log("NOTIFICATION:", notification);
      },
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => { })

    return unsubscribe
  }, [])

  //fixer la rotatiion en mode portrait
  useEffect(() => {
    Orientation.lockToPortrait(); // Verrouille l'orientation en mode portrait

    return () => {
      Orientation.unlockAllOrientations(); // Déverrouille toutes les orientations à la fermeture du composant
    };
  }, []);

  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  )
}

export default App
