import React, { useCallback, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { differenceInDays, parseISO, format } from 'date-fns';

import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { subHours } from 'date-fns/esm';
import { useFetch } from '../../hooks/useFetch';
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
  client_name: string;
  class: string;
  equipment: string;
  type: string;
  status: string;
  description: string;
  updated_at: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();
  const { data } = useFetch<Ticket[]>('tickets');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const clientsPerPage = 3;

  useEffect(() => {
    if (data !== undefined) {
      if (Array.isArray(data) === false) {
        return;
      }

      setTotal(data.length);
      setPage(2);
      setTickets(data.slice(0, clientsPerPage));
    }
  }, [data]);

  const loadTickets = useCallback(async () => {
    if (!data) {
      return;
    }

    if (loading) {
      return;
    }

    if (total > 0 && tickets.length === total) {
      return;
    }

    setLoading(true);
    const indexOfLastClient = page * clientsPerPage;
    const indexOfFirsClient = 0;
    const filteredList = data.filter((ticket: Ticket) => {
      if (
        ticket.client_name
          .toLocaleUpperCase()
          .includes(searchValue.toLocaleUpperCase())
      ) {
        return ticket;
      }
      return null;
    });
    const currentTickets = filteredList.slice(
      indexOfFirsClient,
      indexOfLastClient,
    );

    setTickets(currentTickets);
    setPage(page + 1);
    setLoading(false);
  }, [data, loading, page, searchValue, tickets, total]);

  const navigationToShowTicket = useCallback(
    (ticket: Ticket) => {
      navigate('ShowTicket', { ticket });
    },
    [navigate],
  );

  const navigationToCreateTicket = useCallback(() => {
    navigate('CreateUserTicket');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle onPress={() => signOut()}>
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
        onEndReached={loadTickets}
        keyExtractor={ticket => ticket.id}
        onEndReachedThreshold={0.01}
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
              <TicketName>{ticket.client_name}</TicketName>
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
              <TicketMeta>
                <Icon name="activity" size={14} color="#999591" />
                <TicketMetaText type="default">
                  {format(
                    subHours(parseISO(ticket.updated_at), 3),
                    "dd/MM/yyyy 'às' HH:mm'h'",
                  )}
                </TicketMetaText>
              </TicketMeta>
            </TicketInfo>
          </TicketContainer>
        )}
      />
    </Container>
  );
};

export default AdminDashboard;
