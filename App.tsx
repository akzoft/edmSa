import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { RootNavigation, Store } from './src/libs'
import messaging from '@react-native-firebase/messaging'
import { Alert } from 'react-native'
import { requestUserPermission } from './src/libs/others/functions'

const App = () => {

  useEffect(() => {
    requestUserPermission()

    const unsubscribe = messaging().onMessage(remoteMessage => {
      const notif = remoteMessage.notification
      const data = remoteMessage.data
      Alert.alert("Notifications", notif?.body, [{ text: "D'accord" }])
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => { })

    return unsubscribe
  }, [])


  // useEffect(()=>{
  //   requestUserPermission()

  //   messaging().onMessage(async (remoteMessage) => {    
  //     PushNotification.configure({
  //       onNotification: function(notification) {
  //         notification.finish(PushNotificationIOS.FetchResult.NoData);
  //       }
  //     })
  //   })
  // }, [])


  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  )
}

export default App
