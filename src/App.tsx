import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';

import AppProvider from './hooks';

import Routes from './routes';

PushNotification.configure({
  onRegister(token: any) {
    console.log('TOKEN:', token);
  },

  onNotification(notification: any) {
    console.log('NOTIFICATION:', notification);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};
export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
