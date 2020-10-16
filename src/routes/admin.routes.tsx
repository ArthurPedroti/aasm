import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminDashboard from '../pages/AdminDashboard';
import CreateTicket from '../pages/CreateTicket';
import AdminEditTicket from '../pages/AdminEditTicket';
import ShowTicket from '../pages/ShowTicket';
import TicketUpdates from '../pages/TicketUpdates';
import CreateTicketUpdate from '../pages/CreateTicketUpdate';
import ShowTicketUpdate from '../pages/ShowTicketUpdate';

const App = createStackNavigator();

const AdminRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="AdminDashboard" component={AdminDashboard} />
    <App.Screen name="CreateTicket" component={CreateTicket} />
    <App.Screen name="AdminEditTicket" component={AdminEditTicket} />
    <App.Screen name="ShowTicket" component={ShowTicket} />
    <App.Screen name="TicketUpdates" component={TicketUpdates} />
    <App.Screen name="CreateTicketUpdate" component={CreateTicketUpdate} />
    <App.Screen name="ShowTicketUpdate" component={ShowTicketUpdate} />
  </App.Navigator>
);

export default AdminRoutes;
