import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { differenceInDays, parseISO, format } from 'date-fns';
import { mutate as mutateGlobal } from 'swr';
import StepIndicator from 'react-native-step-indicator';

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
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
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
  stepIndicatorCurrentColor: '#999591',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#dec81b',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#ffffff',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#dec81b',
};

const labels = [
  'Cart',
  'Delivery Address',
  'Order Summary',
  'Payment Method',
  'Track',
];

const data = [
  {
    created_at: '2020-09-17T15:38:01.414Z',
    description: 'Aguardando classificação',
    flag: null,
    id: 'cb625263-6175-4d25-897f-8467ddccea18',
    ticket: {
      classification: 'Sem classificação',
      client_cnpj: '38040697000105',
      client_id: '000005',
      client_name: 'A&J LOCACAO DE EQUIPAMENTOS LTDA',
      created_at: '2020-09-17T15:13:59.297Z',
      description: '123',
      equipment: 'E321',
      id: '1471c7ec-9064-487a-ac51-5a354dce0b42',
      status: 'Não atendido',
      type: 'Máquina parada',
      updated_at: '2020-09-17T15:13:59.297Z',
      user_id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
    },
    ticket_id: '1471c7ec-9064-487a-ac51-5a354dce0b42',
    updated_at: '2020-09-17T15:38:01.414Z',
    user: {
      avatar: null,
      created_at: '2020-08-18T14:30:07.025Z',
      email: 'arthurpedroti@gmail.com',
      id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
      name: 'Arthur Pedroti',
      password: '$2a$08$5JtbRgCD2/q0RyT1Fem9Je1OnQgTMTnJ.jaQOUu5MO1ITYGA2Mw/i',
      role: 'admin',
      updated_at: '2020-08-18T14:30:07.025Z',
    },
    user_id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
  },
  {
    created_at: '2020-09-17T15:36:57.895Z',
    description: 'Em distribuição',
    flag: null,
    id: '3bfbaf10-91da-4ae3-a62e-4b8c1c173e48',
    ticket: {
      classification: 'Sem classificação',
      client_cnpj: '38040697000105',
      client_id: '000005',
      client_name: 'A&J LOCACAO DE EQUIPAMENTOS LTDA',
      created_at: '2020-09-17T15:13:59.297Z',
      description: '123',
      equipment: 'E321',
      id: '1471c7ec-9064-487a-ac51-5a354dce0b42',
      status: 'Não atendido',
      type: 'Máquina parada',
      updated_at: '2020-09-17T15:13:59.297Z',
      user_id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
    },
    ticket_id: '1471c7ec-9064-487a-ac51-5a354dce0b42',
    updated_at: '2020-09-17T15:36:57.895Z',
    user: {
      avatar: null,
      created_at: '2020-08-18T14:30:07.025Z',
      email: 'arthurpedroti@gmail.com',
      id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
      name: 'Arthur Pedroti',
      password: '$2a$08$5JtbRgCD2/q0RyT1Fem9Je1OnQgTMTnJ.jaQOUu5MO1ITYGA2Mw/i',
      role: 'admin',
      updated_at: '2020-08-18T14:30:07.025Z',
    },
    user_id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
  },
  {
    created_at: '2020-09-17T15:34:59.568Z',
    description: 'Em ramificação',
    flag: null,
    id: 'cee8e6bc-5e4a-4c5a-8138-665e59a6c908',
    ticket: {
      classification: 'Sem classificação',
      client_cnpj: '38040697000105',
      client_id: '000005',
      client_name: 'A&J LOCACAO DE EQUIPAMENTOS LTDA',
      created_at: '2020-09-17T15:13:59.297Z',
      description: '123',
      equipment: 'E321',
      id: '1471c7ec-9064-487a-ac51-5a354dce0b42',
      status: 'Não atendido',
      type: 'Máquina parada',
      updated_at: '2020-09-17T15:13:59.297Z',
      user_id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
    },
    ticket_id: '1471c7ec-9064-487a-ac51-5a354dce0b42',
    updated_at: '2020-09-17T15:34:59.568Z',
    user: {
      avatar: null,
      created_at: '2020-08-18T14:30:07.025Z',
      email: 'arthurpedroti@gmail.com',
      id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
      name: 'Arthur Pedroti',
      password: '$2a$08$5JtbRgCD2/q0RyT1Fem9Je1OnQgTMTnJ.jaQOUu5MO1ITYGA2Mw/i',
      role: 'admin',
      updated_at: '2020-08-18T14:30:07.025Z',
    },
    user_id: '9c80f743-e80d-474e-87d4-5ec6aa6e97f4',
  },
];

const TicketUpdates: React.FC = () => {
  const route = useRoute();
  const { ticket_updates } = route.params as RouteParams;
  const { user } = useAuth();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current;

  const renderPage = (rowData: any) => {
    const { item } = rowData;
    return (
      <View style={styles.rowItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length;
    if (visibleItemsCount !== 0) {
      setCurrentPage(viewableItems[visibleItemsCount - 1].index);
    }
  }, []);

  console.log(ticket_updates);
  if (ticket_updates.length === 0) {
    return <TicketTypeText>Não há atualizções</TicketTypeText>;
  }

  const navigationToEditTicket = useCallback(
    ticketRecieved => {
      user.role === 'admin'
        ? navigation.navigate('AdminEditTicket', { ticket: ticketRecieved })
        : navigation.navigate('UserEditTicket', { ticket: ticketRecieved });
    },
    [navigation, user],
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
        <Container>
          <View style={styles.container}>
            <View style={styles.stepIndicator}>
              <StepIndicator
                customStyles={stepIndicatorStyles}
                stepCount={6}
                direction="vertical"
                currentPosition={currentPage}
                labels={data.map(item => item.description)}
              />
            </View>
            <FlatList
              style={{ flexGrow: 1 }}
              data={data}
              renderItem={renderPage}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />
          </View>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#333333',
    paddingVertical: 16,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: '#606060',
    lineHeight: 24,
    marginRight: 8,
  },
});

export default TicketUpdates;
