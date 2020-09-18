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
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current;

  if (ticket_updates.length === 0) {
    return <TicketTypeText>Não há atualizções</TicketTypeText>;
  }

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
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={ticket_updates.length}
            direction="vertical"
            currentPosition={currentPage}
            labels={ticket_updates.map(item => (
              <TicketTypeText>{item.description}</TicketTypeText>
            ))}
          />
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
