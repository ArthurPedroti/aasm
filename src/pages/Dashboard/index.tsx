import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  CreateCallButton,
  CreateCallButtonText,
  ProvidersList,
  ProviderContainer,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
  CallType,
} from './styles';

export interface Call {
  name: string;
  class: string;
  equipment: string;
  description: string;
  type: string;
  status: string;
}

const calls = [
  {
    name: 'Arthur',
    class: 'Garantia',
    equipment: 'Escavadeira',
    description: 'Máquina está superaquecendo',
    type: 'with-palliative-solution',
    status: 'in-attendance',
  },
  {
    name: 'João',
    class: 'Manutenção Preventiva',
    equipment: 'Escavadeira',
    description: 'Máquina está superaquecendo',
    type: 'without-palliative-solution',
    status: 'not-attended',
  },
  {
    name: 'Lucas',
    class: 'Manutenção Corretiva',
    equipment: 'Escavadeira',
    description: 'Máquina está superaquecendo',
    type: 'critical-without-palliative-solution',
    status: 'attended',
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  const navigationToEditCall = useCallback(
    (call: Call) => {
      navigate('EditCall', { call });
    },
    [navigate],
  );

  const navigationToCreateCall = useCallback(() => {
    navigate('CreateCall');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <CreateCallButton onPress={navigationToCreateCall}>
          <CreateCallButtonText>Novo chamado</CreateCallButtonText>
          <Icon name="plus-circle" size={24} color="#999591" />
        </CreateCallButton>
      </Header>

      <ProvidersList
        data={calls}
        keyExtractor={call => call.name}
        ListHeaderComponent={
          <ProvidersListTitle>Seus chamados</ProvidersListTitle>
        }
        renderItem={({ item: call }) => (
          <ProviderContainer onPress={() => navigationToEditCall(call)}>
            {call.type === 'with-palliative-solution' ? (
              <CallType>
                <Icon name="alert-circle" size={72} color="#e6fffa" />
              </CallType>
            ) : null}
            {call.type === 'without-palliative-solution' ? (
              <Icon name="alert-triangle" size={72} color="#dec81b" />
            ) : null}
            {call.type === 'critical-without-palliative-solution' ? (
              <Icon name="alert-octagon" size={72} color="#c53030" />
            ) : null}

            <ProviderInfo>
              <ProviderName>{call.name}</ProviderName>
              {call.status === 'attended' ? (
                <ProviderMeta>
                  <Icon name="check" size={14} color="#78da55" />
                  <ProviderMetaText type="success">Atendido</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.status === 'in-attendance' ? (
                <ProviderMeta>
                  <Icon name="chevrons-right" size={14} color="#dec81b" />
                  <ProviderMetaText type="alert">Em andamento</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.status === 'not-attended' ? (
                <ProviderMeta>
                  <Icon name="clock" size={14} color="#c53030" />
                  <ProviderMetaText type="error">Não atendido</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.type === 'with-palliative-solution' ? (
                <ProviderMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <ProviderMetaText type="default">
                    Máquina não parada
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.type === 'without-palliative-solution' ? (
                <ProviderMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <ProviderMetaText type="default">
                    Máquina parada
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.type === 'critical-without-palliative-solution' ? (
                <ProviderMeta>
                  <Entypo name="tools" size={14} color="#999591" />
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
