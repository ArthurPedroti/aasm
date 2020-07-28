import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProvidersList,
  ProviderContainer,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
} from './styles';

export interface Provider {
  name: string;
  type: string;
}

const providers = [
  {
    name: 'Arthur',
    type: 'with-palliative-solution',
  },
  {
    name: 'João',
    type: 'without-palliative-solution',
  },
  {
    name: 'Lucas',
    type: 'critical-without-palliative-solution',
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.name}
        ListHeaderComponent={
          <ProvidersListTitle>Seus chamados</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => {}}>
            <Icon name="settings" size={72} color="#dec81b" />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#999591" />
                <ProviderMetaText>Assistencia técnica</ProviderMetaText>
              </ProviderMeta>
              {provider.type === 'with-palliative-solution' ? (
                <ProviderMeta>
                  <Icon name="alert-circle" size={14} color="#e6fffa" />
                  <ProviderMetaText>Com solução paliativa</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.type === 'without-palliative-solution' ? (
                <ProviderMeta>
                  <Icon name="alert-triangle" size={14} color="#dec81b" />
                  <ProviderMetaText>Sem solução paliativa</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.type === 'critical-without-palliative-solution' ? (
                <ProviderMeta>
                  <Icon name="alert-octagon" size={14} color="#c53030" />
                  <ProviderMetaText>
                    Crítico e sem solução paliativa
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
