import 'react-native-gesture-handler';

import React, { useEffect, Component } from 'react';
import { View, StatusBar } from 'react-native';
import codePush from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';

import AppProvider from './hooks';

import Routes from './routes';

export interface Notification {
  payload: {
    additionalData: {
      user_id: string;
    };
  };
}

const AppToOneSignal: React.FC = () => {
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

class App extends Component {
  constructor(properties: any) {
    super(properties);
    // Remove this method to stop OneSignal Debugging
    // OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('7e3436d4-7ce1-40e2-ad3c-5f99e92130cb', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }

  // componentWillUnmount(): void {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  // onReceived(notification: any): void {
  //   console.log('Data received: ', notification.payload.notificationID);
  //   console.log('Notification received: ', notification);
  // }

  // onOpened(openResult: any): void {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }

  // onIds(device: any): void {
  //   console.log('Device info: ', device);
  // }

  render(): React.ReactNode {
    return <AppToOneSignal />;
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
