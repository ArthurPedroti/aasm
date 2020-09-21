import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import CreateTicket from '../pages/CreateTicket';
import UserEditTicket from '../pages/UserEditTicket';
import ShowTicket from '../pages/ShowTicket';
import TicketUpdates from '../pages/TicketUpdates';
import ShowTicketUpdate from '../pages/ShowTicketUpdate';

const App = createStackNavigator();

const UserRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateTicket" component={CreateTicket} />
    <App.Screen name="UserEditTicket" component={UserEditTicket} />
    <App.Screen name="ShowTicket" component={ShowTicket} />
    <App.Screen name="TicketUpdates" component={TicketUpdates} />
    <App.Screen name="ShowTicketUpdate" component={ShowTicketUpdate} />
  </App.Navigator>
);

export default UserRoutes;
