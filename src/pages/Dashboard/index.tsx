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
  CallType,
} from './styles';

export interface Provider {
  name: string;
  type: string;
  status: string;
}

const providers = [
  {
    name: 'Arthur',
    type: 'with-palliative-solution',
    status: 'in-attendance',
  },
  {
    name: 'João',
    type: 'without-palliative-solution',
    status: 'not-attended',
  },
  {
    name: 'Lucas',
    type: 'critical-without-palliative-solution',
    status: 'attended',
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
            {provider.type === 'with-palliative-solution' ? (
              <CallType>
                <Icon name="alert-circle" size={72} color="#e6fffa" />
              </CallType>
            ) : null}
            {provider.type === 'without-palliative-solution' ? (
              <Icon name="alert-triangle" size={72} color="#dec81b" />
            ) : null}
            {provider.type === 'critical-without-palliative-solution' ? (
              <Icon name="alert-octagon" size={72} color="#c53030" />
            ) : null}

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              {provider.status === 'attended' ? (
                <ProviderMeta>
                  <Icon name="check" size={14} color="#78da55" />
                  <ProviderMetaText type="success">Atendido</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.status === 'in-attendance' ? (
                <ProviderMeta>
                  <Icon name="chevrons-right" size={14} color="#dec81b" />
                  <ProviderMetaText type="alert">Em andamento</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.status === 'not-attended' ? (
                <ProviderMeta>
                  <Icon name="clock" size={14} color="#c53030" />
                  <ProviderMetaText type="error">Não atendido</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.type === 'with-palliative-solution' ? (
                <ProviderMeta>
                  <Icon name="activity" size={14} color="#f4ede8" />
                  <ProviderMetaText type="default">
                    Máquina não parada
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.type === 'without-palliative-solution' ? (
                <ProviderMeta>
                  <Icon name="tool" size={14} color="#f4ede8" />
                  <ProviderMetaText type="default">
                    Máquina parada
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {provider.type === 'critical-without-palliative-solution' ? (
                <ProviderMeta>
                  <Icon name="activity" size={14} color="#f4ede8" />
                  <ProviderMetaText type="default">
                    Pendência jurídica
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
