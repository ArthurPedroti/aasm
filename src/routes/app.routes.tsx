import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CreateUserTicket from '../pages/CreateUserTicket';
import EditTicket from '../pages/EditTicket';
import ShowTicket from '../pages/ShowTicket';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateUserTicket" component={CreateUserTicket} />
    <App.Screen name="EditTicket" component={EditTicket} />
    <App.Screen name="ShowTicket" component={ShowTicket} />
  </App.Navigator>
);

export default AppRoutes;
