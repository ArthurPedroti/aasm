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
    client: 'Arthur',
    class: 'Garantia',
    equipment: 'Escavadeira',
    type: 'Máquina não parada',
    status: 'Em andamento',
    description: 'Máquina está superaquecendo',
  },
  {
    client: 'João',
    class: 'Manutenção Preventiva',
    equipment: 'Escavadeira',
    type: 'Máquina parada',
    status: 'Não atendido',
    description: 'Máquina está superaquecendo',
  },
  {
    client: 'Lucas',
    class: 'Manutenção Corretiva',
    equipment: 'Escavadeira',
    type: 'Pendência jurídica',
    status: 'Atendido',
    description: 'Máquina está superaquecendo',
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
        ListHeaderComponent={
          <ProvidersListTitle>Seus chamados</ProvidersListTitle>
        }
        renderItem={({ item: call }) => (
          <ProviderContainer onPress={() => navigationToEditCall(call)}>
            {call.type === 'Máquina não parada' ? (
              <CallType>
                <Icon name="alert-circle" size={72} color="#e6fffa" />
              </CallType>
            ) : null}
            {call.type === 'Máquina parada' ? (
              <Icon name="alert-triangle" size={72} color="#dec81b" />
            ) : null}
            {call.type === 'Pendência jurídica' ? (
              <Icon name="alert-octagon" size={72} color="#c53030" />
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
