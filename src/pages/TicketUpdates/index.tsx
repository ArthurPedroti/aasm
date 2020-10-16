import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import api from '../../services/api';
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
import { useAuth } from '../../hooks/auth';

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

interface TicketUpdate {
  id: string;
  flag: string;
  title: string;
  completed: boolean;
  description: string | null;
  updated_at: string;
  created_at: string;
}

const TicketUpdates: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();

  const { ticket_updates, ticket } = route.params as RouteParams;
  const [ticket_updates_formatted, setTicket_updates_formatted] = useState<
    TicketUpdate[]
  >([]);
  const [loading, setloading] = useState(true);
  const [finalActiveUpdate, setFinalActiveUpdate] = useState(0);
  const navigation = useNavigation();
  const [addedSteps, setAddedSteps] = useState(0);

  const navigationToShowTicket = useCallback(
    (ticket_update: TicketUpdate) => {
      navigation.navigate('ShowTicketUpdate', {
        ticket,
        ticket_update,
      });
    },
    [navigation, ticket],
  );

  const navigationToCreateTicket = useCallback(() => {
    navigation.navigate('CreateTicketUpdate', {
      ticket,
      ticket_updates,
    });
  }, [navigation, ticket, ticket_updates]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/ticket-updates/${id}`);

        Alert.alert('Chamado cancelado com sucesso!');

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
    },
    [navigation, user.role],
  );

  const handleDeleteTicket = useCallback(
    (id: string) => {
      Alert.alert('Você tem certeza que deseja cancelar esse chamado?', '', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => handleDelete(id),
        },
      ]);
    },
    [handleDelete],
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
    {
      title: 'Concluído',
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
      const new_ticket_updates = ticket_updates.map(item => {
        const newItem = item;
        newItem.completed = true;
        return newItem;
      });

      tickets_standart.forEach(item => {
        const ticketFound = new_ticket_updates.find(
          itemTU => itemTU.title === item.title,
        );

        if (!ticketFound) {
          setAddedSteps(addedSteps + 1);
          new_ticket_updates.push(item);
        }
      });

      setTicket_updates_formatted(new_ticket_updates);
      const completedItemCount = new_ticket_updates.reduce(
        (acc, currentValue) => {
          if (currentValue.completed === true) {
            const newAcc = acc + 1;
            return newAcc;
          }
          return acc;
        },
        0,
      );
      setFinalActiveUpdate(completedItemCount);
    };

    checkUpdates();

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
          ticket_updates_formatted.map(ticket_update => {
            const index = ticket_updates_formatted.indexOf(ticket_update);
            return (
              <TicketWrap>
                <TicketLine completed={ticket_update.completed} />
                <TicketContainer key={ticket_update.id}>
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
                        <ActionButton
                          onPress={() => handleDeleteTicket(ticket_update.id)}
                          style={{ backgroundColor: '#e9a5a5' }}
                        >
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
          onPress={() => navigationToCreateTicket()}
          style={{ marginBottom: 30 }}
        >
          Nova Atualização
        </Button>
      </Container>
    </>
  );
};

export default TicketUpdates;
