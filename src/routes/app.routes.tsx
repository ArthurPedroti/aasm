import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CreateCall from '../pages/CreateCall';
import EditCall from '../pages/EditCall';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateCall" component={CreateCall} />
    <App.Screen name="EditCall" component={EditCall} />
  </App.Navigator>
);

export default AppRoutes;
