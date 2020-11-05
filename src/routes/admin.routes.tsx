import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Feather';
import AdminDashboard from '../pages/AdminDashboard';
import CreateTicket from '../pages/CreateTicket';
import AdminEditTicket from '../pages/AdminEditTicket';
import ShowTicket from '../pages/ShowTicket';
import TicketUpdates from '../pages/TicketUpdates';
import ShowTicketUpdate from '../pages/ShowTicketUpdate';
import CreateTicketUpdate from '../pages/CreateTicketUpdate';
import KPIs from '../pages/KPIs';

const App = createStackNavigator();
const Bottom = createBottomTabNavigator();

const AdminStackRoutes: React.FC = () => (
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

const KPIsRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <App.Screen name="KPIs" component={KPIs} />
  </App.Navigator>
);

const AdminTabs: React.FC = () => (
  <Bottom.Navigator
    tabBarOptions={{
      style: {
        height: 60,
        backgroundColor: '#312e38',
        borderTopWidth: 1,
        borderTopColor: '#28262e',
      },
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconStyle: {
        flex: 0,
        width: 20,
        height: 20,
      },
      labelStyle: {
        fontSize: 11,
        marginTop: 5,
      },
      inactiveTintColor: '#f4ede8',
      activeTintColor: '#dec81b',
    }}
  >
    <Bottom.Screen
      name="Dashboard"
      component={AdminStackRoutes}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon
            name="grid"
            size={size}
            color={focused ? '#dec81b' : '#f4ede8'}
          />
        ),
      }}
    />
    <Bottom.Screen
      name="Indicadores"
      component={KPIsRoutes}
      options={{
        tabBarIcon: ({ size, focused }) => (
          <Icon
            name="bar-chart-2"
            size={size}
            color={focused ? '#dec81b' : '#f4ede8'}
          />
        ),
      }}
    />
  </Bottom.Navigator>
);

export default AdminTabs;
