import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';

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
    completed: boolean;
    description: string | null;
    updated_at: string;
    created_at: string;
  }[];
}

const TicketUpdates: React.FC = () => {
  const route = useRoute();
  const { ticket_updates } = route.params as RouteParams;
  const [loading, setloading] = useState(true);
  const [finalActiveUpdate, setFinalActiveUpdate] = useState(0);
  const navigation = useNavigation();
  const [addedSteps, setAddedSteps] = useState(0);

  const navigationToShowTicket = useCallback(
    (ticket_update: TicketUpdate) => {
      navigation.navigate('ShowTicketUpdate', { ticket_update });
    },
    [navigation],
  );

  const tickets_standart = [
    {
      title: 'Aguardando classificação',
      description: null,
      completed: false,
      id: '',
      flag: '',
      updated_at: '',
      created_at: '',
    },
    {
      title: 'Classificado',
      description: null,
      completed: false,
      id: '',
      flag: '',
      updated_at: '',
      created_at: '',
    },
    {
      title: 'Primeiro contato',
      description: null,
      completed: false,
      id: '',
      flag: '',
      updated_at: '',
      created_at: '',
    },
    {
      title: 'Envio de técnico',
      description: null,
      completed: false,
      id: '',
      flag: '',
      updated_at: '',
      created_at: '',
    },
    {
      title: 'Em antendimento',
      description: null,
      completed: false,
      id: '',
      flag: '',
      updated_at: '',
      created_at: '',
    },
  ];

  useEffect(() => {
    const checkUpdates = (): void => {
      ticket_updates.forEach(item => {
        const newItem = item;
        newItem.completed = true;
        return newItem;
      });
      tickets_standart.forEach(item => {
        const ticketFound = ticket_updates.find(
          itemTU => itemTU.title === item.title,
        );

        if (!ticketFound) {
          setAddedSteps(addedSteps + 1);
          ticket_updates.push(item);
        }
      });
    };

    checkUpdates();
    const completedItemCount = ticket_updates.reduce((acc, currentValue) => {
      if (currentValue.completed === true) {
        const newAcc = acc + 1;
        return newAcc;
      }
      return acc;
    }, 0);
    setFinalActiveUpdate(completedItemCount);
    setloading(false);
  }, []);

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Atualizações</HeaderTitle>
      </Header>
      <Container>
        {loading !== true ? (
          ticket_updates.map(ticket_update => {
            const index = ticket_updates.indexOf(ticket_update);
            return (
              <TicketWrap>
                <TicketLine completed={ticket_update.completed} />
                <TicketContainer>
                  {ticket_update.completed === true ? (
                    <Icon name="controller-record" size={16} color="#dec81b" />
                  ) : (
                    <Icon name="controller-record" size={16} color="#3e3b47" />
                  )}
                  <TicketUpdateMeta key={ticket_update.id}>
                    <TicketUpdateTitle>{ticket_update.title}</TicketUpdateTitle>
                    {ticket_update.description && (
                      <TicketUpdateDescription>
                        {ticket_update.description}
                      </TicketUpdateDescription>
                    )}
                    {index + 1 === finalActiveUpdate ? (
                      <TicketActions>
                        <ActionButton style={{ backgroundColor: '#e9a5a5' }}>
                          <ButtonText>Deletar</ButtonText>
                        </ActionButton>
                        <ActionButton
                          onPress={() => navigationToShowTicket(ticket_update)}
                        >
                          <ButtonText>Editar</ButtonText>
                        </ActionButton>
                      </TicketActions>
                    ) : null}
                  </TicketUpdateMeta>
                </TicketContainer>
              </TicketWrap>
            );
          })
        ) : (
          <HeaderTitle>Carregando...</HeaderTitle>
        )}
        <Button
          onPress={() => navigation.navigate('CreateTicketUpdate')}
          style={{ marginBottom: 30 }}
        >
          Nova Atualização
        </Button>
      </Container>
    </>
  );
};

export default TicketUpdates;
