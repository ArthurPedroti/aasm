import React, { useCallback } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { differenceInDays, parseISO, format } from 'date-fns';
import { mutate as mutateGlobal } from 'swr';

import api from '../../services/api';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  TicketContainer,
  TicketInfo,
  TicketTypeTitle,
  TicketMeta,
  TicketMetaText,
  TicketType,
  TicketTypeText,
  TicketTypeMeta,
} from './styles';
import { useFetch } from '../../hooks/useFetch';

interface RouteParams {
  ticket: {
    id: string;
    user: {
      name: string;
    };
    client_name: string;
    classification: string;
    equipment: string;
    type: string;
    status: string;
    description: string;
    updated_at: string;
    created_at: string;
  };
}

export interface TicketUpdate {
  id: string;
  flag: string;
  title: string;
  description: string | null;
  updated_at: string;
  created_at: string;
}

const ShowTicket: React.FC = () => {
  const route = useRoute();
  const { ticket } = route.params as RouteParams;
  const { user } = useAuth();
  const { data: ticket_updates } = useFetch<TicketUpdate[]>(
    `ticket-updates/${ticket.id}`,
  );
  const navigation = useNavigation();

  const navigationToEditTicket = useCallback(
    ticketRecieved => {
      user.role === 'admin'
        ? navigation.navigate('AdminEditTicket', { ticket: ticketRecieved })
        : navigation.navigate('UserEditTicket', { ticket: ticketRecieved });
    },
    [navigation, user],
  );

  const navigationToTicketUpdates = useCallback(
    ticketUpdates => {
      navigation.navigate('TicketUpdates', { ticket_updates: ticketUpdates });
    },
    [navigation],
  );

  const handleDelete = useCallback(async () => {
    try {
      await api.delete(`/tickets/${ticket.id}`);

      Alert.alert('Chamado cancelado com sucesso!');
      mutateGlobal('tickets/me');

      if (user.role === 'admin') {
        navigation.navigate('AdminDashboard');
      } else {
        navigation.navigate('Dashboard');
      }
    } catch (err) {
      Alert.alert(
        'Erro ao deletar',
        'Ocorreu um erro ao cancelar o chamado, tente novamente.',
      );
    }
  }, [navigation, ticket, user]);

  const handleDeleteTicket = useCallback(() => {
    Alert.alert('Você tem certeza que deseja cancelar esse chamado?', '', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => handleDelete(),
      },
    ]);
  }, [handleDelete]);

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Chamado</HeaderTitle>
      </Header>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <TicketContainer>
              {ticket.type === 'Máquina não parada' &&
              differenceInDays(Date.now(), parseISO(ticket.created_at)) < 20 ? (
                <TicketType>
                  <Icon name="alert-circle" size={72} color="#e6fffa" />
                  <TicketTypeMeta>
                    <TicketTypeTitle>{ticket.client_name}</TicketTypeTitle>
                    <TicketTypeText>
                      Chamado aberto à{' '}
                      {
                        -differenceInDays(
                          parseISO(ticket.created_at),
                          Date.now(),
                        )
                      }{' '}
                      dias
                    </TicketTypeText>
                  </TicketTypeMeta>
                </TicketType>
              ) : null}
              {(ticket.type === 'Máquina parada' &&
                differenceInDays(Date.now(), parseISO(ticket.created_at)) <
                  8) ||
              (ticket.type === 'Máquina não parada' &&
                differenceInDays(Date.now(), parseISO(ticket.created_at)) >
                  19 &&
                differenceInDays(Date.now(), parseISO(ticket.created_at)) <
                  28) ? (
                <TicketType>
                  <Icon name="alert-triangle" size={72} color="#dec81b" />
                  <TicketTypeMeta>
                    <TicketTypeTitle>{ticket.client_name}</TicketTypeTitle>
                    <TicketTypeText>
                      Chamado aberto à{' '}
                      {
                        -differenceInDays(
                          parseISO(ticket.created_at),
                          Date.now(),
                        )
                      }{' '}
                      dias
                    </TicketTypeText>
                  </TicketTypeMeta>
                </TicketType>
              ) : null}
              {ticket.type === 'Pendência jurídica' ||
              (ticket.type === 'Máquina não parada' &&
                differenceInDays(Date.now(), parseISO(ticket.created_at)) >
                  27) ||
              (ticket.type === 'Máquina parada' &&
                differenceInDays(Date.now(), parseISO(ticket.created_at)) >
                  7) ? (
                <TicketType>
                  <Icon name="alert-octagon" size={72} color="#c53030" />
                  <TicketTypeMeta>
                    <TicketTypeTitle>{ticket.client_name}</TicketTypeTitle>
                    <TicketTypeText>
                      Chamado aberto à{' '}
                      {
                        -differenceInDays(
                          parseISO(ticket.created_at),
                          Date.now(),
                        )
                      }{' '}
                      dias
                    </TicketTypeText>
                  </TicketTypeMeta>
                </TicketType>
              ) : null}

              <TicketInfo>
                {ticket.status === 'Atendido' ? (
                  <TicketMeta>
                    <Icon name="check" size={14} color="#78da55" />
                    <TicketMetaText type="success">Atendido</TicketMetaText>
                  </TicketMeta>
                ) : null}
                {ticket.status === 'Em atendimento' ? (
                  <TicketMeta>
                    <Icon name="chevrons-right" size={14} color="#dec81b" />
                    <TicketMetaText type="alert">Em atendimento</TicketMetaText>
                  </TicketMeta>
                ) : null}
                {ticket.status === 'Não atendido' ? (
                  <TicketMeta>
                    <Icon name="clock" size={14} color="#c53030" />
                    <TicketMetaText type="error">Não atendido</TicketMetaText>
                  </TicketMeta>
                ) : null}
                <TicketMeta>
                  <Icon name="chevron-right" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    {ticket.classification}
                  </TicketMetaText>
                </TicketMeta>
                <TicketMeta>
                  <Icon name="chevron-right" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    {ticket.equipment}
                  </TicketMetaText>
                </TicketMeta>
                <TicketMeta>
                  <Icon name="chevron-right" size={14} color="#999591" />
                  <TicketMetaText type="default">{ticket.type}</TicketMetaText>
                </TicketMeta>
                <TicketMeta>
                  <Icon name="chevron-right" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    {ticket.description}
                  </TicketMetaText>
                </TicketMeta>
                <TicketMeta>
                  <Icon name="chevron-right" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    Chamado aberto no dia{' '}
                    {format(parseISO(ticket.created_at), 'dd/MM/yyyy')}
                  </TicketMetaText>
                </TicketMeta>
                <TicketMeta>
                  <Icon name="chevron-right" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    Última atualização:{' '}
                    {format(
                      parseISO(ticket.updated_at),
                      "dd/MM/yyyy 'às' HH:mm'h'",
                    )}
                  </TicketMetaText>
                </TicketMeta>
                <TicketMeta>
                  <Icon name="user" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    {ticket.user.name}
                  </TicketMetaText>
                </TicketMeta>
              </TicketInfo>
            </TicketContainer>

            <TicketContainer>
              <TicketType>
                <TicketTypeMeta>
                  <TicketTypeTitle>ÚLTIMA ATUALIZAÇÃO</TicketTypeTitle>
                </TicketTypeMeta>
              </TicketType>

              <TicketInfo>
                {ticket_updates ? (
                  <TicketMeta>
                    <Icon name="circle" size={14} color="#999591" />
                    <TicketMetaText type="default">
                      {ticket_updates[ticket_updates.length - 1].title}
                    </TicketMetaText>
                  </TicketMeta>
                ) : null}
              </TicketInfo>
              <Button onPress={() => navigationToTicketUpdates(ticket_updates)}>
                Ver mais
              </Button>
            </TicketContainer>

            <Button onPress={() => navigationToEditTicket(ticket)}>
              Editar
            </Button>

            <Button type="error" onPress={() => handleDeleteTicket()}>
              Cancelar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default ShowTicket;
