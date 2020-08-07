import React, { useCallback } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { differenceInDays, parseISO, format } from 'date-fns';

import Button from '../../components/Button';

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

interface RouteParams {
  ticket: {
    id: string;
    client: string;
    classification: string;
    equipment: string;
    type: string;
    status: string;
    description: string;
    created_at: string;
  };
}

const ShowTicket: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { ticket } = route.params as RouteParams;

  const navigationToEditTicket = useCallback(
    ticketRecieved => {
      navigation.navigate('EditTicket', { ticket: ticketRecieved });
    },
    [navigation],
  );

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
              -differenceInDays(parseISO(ticket.created_at), Date.now()) <
                10 ? (
                <TicketType>
                  <Icon name="alert-circle" size={72} color="#e6fffa" />
                  <TicketTypeTitle>{ticket.client}</TicketTypeTitle>
                  <TicketTypeText>
                    Chamado aberto à{' '}
                    {-differenceInDays(parseISO(ticket.created_at), Date.now())}{' '}
                    dias
                  </TicketTypeText>
                </TicketType>
              ) : null}
              {(ticket.type === 'Máquina parada' &&
                -differenceInDays(parseISO(ticket.created_at), Date.now()) <
                  2) ||
              (ticket.type === 'Máquina não parada' &&
                -differenceInDays(parseISO(ticket.created_at), Date.now()) <
                  20 &&
                -differenceInDays(parseISO(ticket.created_at), Date.now()) >
                  9) ? (
                <TicketType>
                  <Icon name="alert-triangle" size={72} color="#dec81b" />
                  <TicketTypeMeta>
                    <TicketTypeTitle>{ticket.client}</TicketTypeTitle>
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
                -differenceInDays(parseISO(ticket.created_at), Date.now()) >
                  19) ||
              (ticket.type === 'Máquina parada' &&
                -differenceInDays(parseISO(ticket.created_at), Date.now()) >
                  1) ? (
                <TicketType>
                  <Icon name="alert-octagon" size={72} color="#c53030" />
                  <TicketTypeText>
                    Chamado aberto à{' '}
                    {-differenceInDays(parseISO(ticket.created_at), Date.now())}{' '}
                    dias
                  </TicketTypeText>
                </TicketType>
              ) : null}

              <TicketInfo>
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
              </TicketInfo>
            </TicketContainer>

            <Button onPress={() => navigationToEditTicket(ticket)}>
              Editar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default ShowTicket;
