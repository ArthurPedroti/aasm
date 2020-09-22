import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  TicketTypeMeta,
  TicketTypeTitle,
  TicketInfo,
  TicketContainer,
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

const stepIndicatorStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize: 24,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#dec81b',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#dec81b',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#dec81b',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#dec81b',
  stepIndicatorUnFinishedColor: '#999591',
  stepIndicatorCurrentColor: '#232129',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 16,
  labelAlign: 'flex-start',
  currentStepLabelColor: '#dec81b',
};

const labels = [
  'Cart',
  'Delivery Address',
  'Order Summary',
  'Payment Method',
  'Track',
];

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
            <TicketContainer>
              {/* <Icon name="alert-circle" size={36} color="#e6fffa" /> */}
              <TicketTypeMeta key={ticket_update.id}>
                <TicketTypeTitle>{ticket_update.title}</TicketTypeTitle>
                <TicketTypeTitle>{ticket_update.description}</TicketTypeTitle>
                {/* <TicketActions>
                    {index + 1 === ticket_updates.length ? (
                      <ActionButton style={{ backgroundColor: '#e9a5a5' }}>
                      <TextButton>Deletar</TextButton>
                      </ActionButton>
                      ) : null}
                      <ActionButton>
                      <TextButton>Editar</TextButton>
                      </ActionButton>
                    </TicketActions> */}
              </TicketTypeMeta>
            </TicketContainer>
          );
        })}
        <Button>Nova Atualização</Button>
      </Container>
    </>
  );
};

export default TicketUpdates;
