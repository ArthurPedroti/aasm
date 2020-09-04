import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import OneSignal from 'react-native-onesignal';

import AuthRoutes from './auth.routes';
import UserRoutes from './user.routes';
import AdminRoutes from './admin.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (user) {
    // Setting External User Id with Callback Available in SDK Version 3.7.0+
    if (user.role === 'admin') {
      OneSignal.sendTag('role', 'admin');
      OneSignal.sendTag('user_id', user.id);
      OneSignal.sendTag('user_name', user.name);
    } else {
      OneSignal.sendTag('role', 'user');
      OneSignal.sendTag('user_id', user.id);
      OneSignal.sendTag('user_name', user.name);
    }
    OneSignal.setExternalUserId(user.id, results => {
      // The results will contain push and email success statuses
      console.log('Results of setting external user id');
      console.log(results);

      // Push can be expected in almost every situation with a success status, but
      // as a pre-caution its good to verify it exists
      if (results.push && results.push.success) {
        console.log('Results of setting external user id push status:');
        console.log(results.push.success);
      }

      // Verify the email is set or check that the results have an email success status
      if (results.email && results.email.success) {
        console.log('Results of setting external user id email status:');
        console.log(results.email.success);
      }
    });

    // Available in SDK Version 3.6.5-
    // OneSignal.setExternalUserId(myCustomUniqueUserId);
    return user.role === 'admin' ? <AdminRoutes /> : <UserRoutes />;
  }

  return <AuthRoutes />;
};

export default Routes;
