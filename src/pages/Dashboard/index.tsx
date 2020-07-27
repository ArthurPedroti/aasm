import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProvidersList,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
      </Header>

      <ProvidersList />
    </Container>
  );
};

export default Dashboard;
