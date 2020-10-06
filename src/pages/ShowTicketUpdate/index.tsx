import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

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
  TicketTypeMeta,
} from './styles';

interface RouteParams {
  ticket_update: {
    id: string;
    flag: string;
    title: string;
    description: string | null;
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

const ShowTicketUpdate: React.FC = () => {
  const route = useRoute();
  const { ticket_update } = route.params as RouteParams;
  const navigation = useNavigation();

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
              <TicketType>
                <TicketTypeMeta>
                  <TicketTypeTitle>ATUALIZAÇÕES</TicketTypeTitle>
                </TicketTypeMeta>
              </TicketType>

              <TicketInfo>
                <TicketMeta>
                  <Icon name="circle" size={14} color="#999591" />
                  <TicketMetaText type="default">
                    {ticket_update.description}
                  </TicketMetaText>
                </TicketMeta>
              </TicketInfo>
            </TicketContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default ShowTicketUpdate;
