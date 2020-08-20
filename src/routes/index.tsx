import React from 'react';
import { View, ActivityIndicator } from 'react-native';

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
    return user.role === 'admin' ? <AdminRoutes /> : <UserRoutes />;
  }

  return <AuthRoutes />;
};

export default Routes;
