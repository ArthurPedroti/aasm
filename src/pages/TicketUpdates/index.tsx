import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  TicketContainer,
  TicketUpdateMeta,
  TicketUpdateTitle,
  TicketUpdateDescription,
  TicketActions,
  ActionButton,
  ButtonText,
  TicketWrap,
  TicketLine,
} from './styles';
import { TicketUpdate } from '../ShowTicket';

interface RouteParams {
  ticket_updates: {
    id: string;
    flag: string;
    title: string;
    description: string;
    updated_at: string;
    created_at: string;
  }[];
}

const TicketUpdates: React.FC = () => {
  const route = useRoute();
  const { ticket_updates } = route.params as RouteParams;
  const { user } = useAuth();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(2);

  const navigationToShowTicket = useCallback(
    (ticket_update: TicketUpdate) => {
      navigation.navigate('ShowTicketUpdate', { ticket_update });
    },
    [navigation],
  );

  console.log(ticket_updates);

  const tickets_standart = [
    {
      title: 'Aguardando classificação',
      description: null,
    },
    {
      title: 'Aguardando classificação',
      description: null,
    },
    {
      title: 'Aguardando classificação',
      description: null,
    },
  ];

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Atualizações</HeaderTitle>
      </Header>
      <Container>
        {ticket_updates.map(ticket_update => {
          const index = ticket_updates.indexOf(ticket_update);
          return (
            <TicketWrap>
              <TicketLine />
              <TicketContainer>
                <Icon name="controller-record" size={16} color="#dec81b" />
                <TicketUpdateMeta key={ticket_update.id}>
                  <TicketUpdateTitle>{ticket_update.title}</TicketUpdateTitle>
                  {ticket_update.description && (
                    <TicketUpdateDescription>
                      {ticket_update.description}
                    </TicketUpdateDescription>
                  )}
                  {index + 1 === ticket_updates.length ? (
                    <TicketActions>
                      <ActionButton style={{ backgroundColor: '#e9a5a5' }}>
                        <ButtonText>Deletar</ButtonText>
                      </ActionButton>
                      <ActionButton>
                        <ButtonText>Editar</ButtonText>
                      </ActionButton>
                    </TicketActions>
                  ) : null}
                </TicketUpdateMeta>
              </TicketContainer>
            </TicketWrap>
          );
        })}
        <Button style={{ marginBottom: 30 }}>Nova Atualização</Button>
      </Container>
    </>
  );
};

export default TicketUpdates;
