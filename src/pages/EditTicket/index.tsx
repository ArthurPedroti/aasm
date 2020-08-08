import React, { useRef, useCallback } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Header, HeaderTitle, BackButton } from './styles';

interface RouteParams {
  ticket: {
    id: string;
    client: string;
    equipment: string;
    type: string;
    description: string;
  };
}

interface EditTicketFormData {
  id: string;
  client: string;
  equipment: string;
  type: string;
  description: string;
}

const EditTicket: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { ticket } = route.params as RouteParams;

  const equipmentInputRef = useRef<TextInput>(null);
  const typeInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handleEditTicket = useCallback(
    async (data: EditTicketFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          client: Yup.string().required('Cliente obrigatório'),
          equipment: Yup.string().required('Equipamento obrigatório'),
          type: Yup.string().required('Tipo obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const updatedTicket = await api.put(`/tickets/${ticket.id}/me`, data);

        Alert.alert('Chamado editado com sucesso!');
        mutateGlobal('tickets/me', { updatedTicket });

        navigation.navigate('ShowTicket', { ticket: updatedTicket.data });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao editar o chamado, tente novamente.',
        );
      }
    },
    [navigation, ticket.id],
  );

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Editar Chamado</HeaderTitle>
      </Header>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Form
              initialData={ticket}
              ref={formRef}
              onSubmit={handleEditTicket}
            >
              <Input
                autoCapitalize="words"
                name="client"
                icon="user"
                placeholder="Cliente"
                returnKeyType="next"
                onSubmitEditing={() => {
                  equipmentInputRef.current?.focus();
                }}
              />
              <Input
                ref={equipmentInputRef}
                autoCapitalize="words"
                name="equipment"
                icon="settings"
                placeholder="Equipamento"
                returnKeyType="next"
                onSubmitEditing={() => {
                  typeInputRef.current?.focus();
                }}
              />
              <Input
                ref={typeInputRef}
                autoCapitalize="words"
                name="type"
                icon="tag"
                placeholder="Tipo"
                returnKeyType="next"
                onSubmitEditing={() => {
                  descriptionInputRef.current?.focus();
                }}
              />
              <Input
                ref={descriptionInputRef}
                autoCapitalize="words"
                name="description"
                icon="message-square"
                placeholder="Descrição"
                returnKeyType="send"
                multiline
                numberOfLines={8}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Salvar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default EditTicket;
