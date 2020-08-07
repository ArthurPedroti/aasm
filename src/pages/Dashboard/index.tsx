import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { differenceInDays, parseISO } from 'date-fns';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  CreateTicketButton,
  CreateTicketButtonText,
  TicketsList,
  TicketContainer,
  TicketInfo,
  TicketName,
  TicketMeta,
  TicketMetaText,
  TicketsListTitle,
  TicketType,
  TicketTypeText,
} from './styles';

export interface Ticket {
  id: string;
  client: string;
  class: string;
  equipment: string;
  type: string;
  status: string;
  description: string;
  created_at: string;
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
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const navigationToShowTicket = useCallback(
    (ticket: Ticket) => {
      navigate('ShowTicket', { ticket });
    },
    [navigate],
  );

  const navigationToCreateTicket = useCallback(() => {
    navigate('CreateTicket');
  }, [navigate]);

  useEffect(() => {
    api.get('tickets/me').then(response => {
      setTickets(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <CreateTicketButton onPress={navigationToCreateTicket}>
          <CreateTicketButtonText>Novo chamado</CreateTicketButtonText>
          <Icon name="plus-circle" size={24} color="#999591" />
        </CreateTicketButton>
      </Header>
      <TicketsList
        data={tickets}
        keyExtractor={ticket => ticket.client}
        ListFooterComponent={<View style={{ margin: 32 }} />}
        ListHeaderComponent={<TicketsListTitle>Seus chamados</TicketsListTitle>}
        renderItem={({ item: ticket }) => (
          <TicketContainer onPress={() => navigationToShowTicket(ticket)}>
            {ticket.type === 'Máquina não parada' &&
            -differenceInDays(parseISO(ticket.created_at), Date.now()) < 10 ? (
              <TicketType>
                <Icon name="alert-circle" size={72} color="#e6fffa" />
                <TicketTypeText>
                  {-differenceInDays(parseISO(ticket.created_at), Date.now())}{' '}
                  dias
                </TicketTypeText>
              </TicketType>
            ) : null}
            {(ticket.type === 'Máquina parada' &&
              -differenceInDays(parseISO(ticket.created_at), Date.now()) < 2) ||
            (ticket.type === 'Máquina não parada' &&
              -differenceInDays(parseISO(ticket.created_at), Date.now()) < 20 &&
              -differenceInDays(parseISO(ticket.created_at), Date.now()) >
                9) ? (
              <TicketType>
                <Icon name="alert-triangle" size={72} color="#dec81b" />
                <TicketTypeText>
                  {-differenceInDays(parseISO(ticket.created_at), Date.now())}{' '}
                  dias
                </TicketTypeText>
              </TicketType>
            ) : null}
            {ticket.type === 'Pendência jurídica' ||
            (ticket.type === 'Máquina não parada' &&
              -differenceInDays(parseISO(ticket.created_at), Date.now()) >
                19) ||
            (ticket.type === 'Máquina parada' &&
              -differenceInDays(parseISO(ticket.created_at), Date.now()) >
                1) ? (
              <TicketType>
                <Icon name="alert-octagon" size={72} color="#c53030" />
                <TicketTypeText>
                  {-differenceInDays(parseISO(ticket.created_at), Date.now())}{' '}
                  dias
                </TicketTypeText>
              </TicketType>
            ) : null}

            <TicketInfo>
              <TicketName>{ticket.client}</TicketName>
              {ticket.status === 'Atendido' ? (
                <TicketMeta>
                  <Icon name="check" size={14} color="#78da55" />
                  <TicketMetaText type="success">Atendido</TicketMetaText>
                </TicketMeta>
              ) : null}
              {ticket.status === 'Em andamento' ? (
                <TicketMeta>
                  <Icon name="chevrons-right" size={14} color="#dec81b" />
                  <TicketMetaText type="alert">Em andamento</TicketMetaText>
                </TicketMeta>
              ) : null}
              {ticket.status === 'Não atendido' ? (
                <TicketMeta>
                  <Icon name="clock" size={14} color="#c53030" />
                  <TicketMetaText type="error">Não atendido</TicketMetaText>
                </TicketMeta>
              ) : null}
              {ticket.type === 'Máquina não parada' ? (
                <TicketMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    Máquina não parada
                  </TicketMetaText>
                </TicketMeta>
              ) : null}
              {ticket.type === 'Máquina parada' ? (
                <TicketMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <TicketMetaText type="default">Máquina parada</TicketMetaText>
                </TicketMeta>
              ) : null}
              {ticket.type === 'Pendência jurídica' ? (
                <TicketMeta>
                  <Entypo name="tools" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    Pendência jurídica
                  </TicketMetaText>
                </TicketMeta>
              ) : null}
            </TicketInfo>
          </TicketContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
