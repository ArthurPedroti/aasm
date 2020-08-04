import React, { useCallback } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { differenceInDays } from 'date-fns';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
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
  CallTypeText,
} from './styles';

export interface Call {
  client: string;
  class: string;
  equipment: string;
  type: string;
  status: string;
  description: string;
  created_at: Date;
}

const calls = [
  {
    client: 'Guilherme',
    class: 'Garantia',
    equipment: 'Escavadeira',
    type: 'Máquina não parada',
    status: 'Em andamento',
    description: 'Máquina está superaquecendo',
    created_at: new Date(2020, 6, 30),
  },
  {
    client: 'Arthur',
    class: 'Garantia',
    equipment: 'Escavadeira',
    type: 'Máquina não parada',
    status: 'Em andamento',
    description: 'Máquina está superaquecendo',
    created_at: new Date(2020, 6, 25),
  },
  {
    client: 'João',
    class: 'Manutenção Preventiva',
    equipment: 'Escavadeira',
    type: 'Máquina parada',
    status: 'Não atendido',
    description: 'Máquina está superaquecendo',
    created_at: new Date(2020, 7, 2),
  },
  {
    client: 'Lucas',
    class: 'Manutenção Corretiva',
    equipment: 'Escavadeira',
    type: 'Pendência jurídica',
    status: 'Atendido',
    description: 'Máquina está superaquecendo',
    created_at: new Date(2020, 7, 3),
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
        keyExtractor={call => call.client}
        ListFooterComponent={<View style={{ margin: 32 }} />}
        ListHeaderComponent={
          <ProvidersListTitle>Seus chamados</ProvidersListTitle>
        }
        renderItem={({ item: call }) => (
          <ProviderContainer onPress={() => navigationToEditCall(call)}>
            {call.type === 'Máquina não parada' &&
            -differenceInDays(call.created_at, Date.now()) < 10 ? (
              <CallType>
                <Icon name="alert-circle" size={72} color="#e6fffa" />
                <CallTypeText>
                  {-differenceInDays(call.created_at, Date.now())} dias
                </CallTypeText>
              </CallType>
            ) : null}
            {(call.type === 'Máquina parada' &&
              -differenceInDays(call.created_at, Date.now()) < 2) ||
            (call.type === 'Máquina não parada' &&
              -differenceInDays(call.created_at, Date.now()) < 20 &&
              -differenceInDays(call.created_at, Date.now()) > 9) ? (
              <CallType>
                <Icon name="alert-triangle" size={72} color="#dec81b" />
                <CallTypeText>
                  {-differenceInDays(call.created_at, Date.now())} dias
                </CallTypeText>
              </CallType>
            ) : null}
            {call.type === 'Pendência jurídica' ||
            (call.type === 'Máquina não parada' &&
              -differenceInDays(call.created_at, Date.now()) > 19) ||
            (call.type === 'Máquina parada' &&
              -differenceInDays(call.created_at, Date.now()) > 1) ? (
              <CallType>
                <Icon name="alert-octagon" size={72} color="#c53030" />
                <CallTypeText>
                  {-differenceInDays(call.created_at, Date.now())} dias
                </CallTypeText>
              </CallType>
            ) : null}

            <ProviderInfo>
              <ProviderName>{call.client}</ProviderName>
              {call.status === 'Atendido' ? (
                <ProviderMeta>
                  <Icon name="check" size={14} color="#78da55" />
                  <ProviderMetaText type="success">Atendido</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.status === 'Em andamento' ? (
                <ProviderMeta>
                  <Icon name="chevrons-right" size={14} color="#dec81b" />
                  <ProviderMetaText type="alert">Em andamento</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.status === 'Não atendido' ? (
                <ProviderMeta>
                  <Icon name="clock" size={14} color="#c53030" />
                  <ProviderMetaText type="error">Não atendido</ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.type === 'Máquina não parada' ? (
                <ProviderMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <ProviderMetaText type="default">
                    Máquina não parada
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.type === 'Máquina parada' ? (
                <ProviderMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <ProviderMetaText type="default">
                    Máquina parada
                  </ProviderMetaText>
                </ProviderMeta>
              ) : null}
              {call.type === 'Pendência jurídica' ? (
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
