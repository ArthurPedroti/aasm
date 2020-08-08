import React, { useRef, useCallback } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';
import * as Yup from 'yup';
import Picker from '../../components/Picker';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Header, HeaderTitle, BackButton } from './styles';

interface CreateTicketFormData {
  client: string;
  equipment: string;
  type: string;
  description: string;
}

const CreateUserTicket: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const equipmentInputRef = useRef<TextInput>(null);
  const typeInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handleCreateTicket = useCallback(
    async (data: CreateTicketFormData) => {
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
        const updatedTicket = await api.post(`/tickets`, data);

        Alert.alert('Chamado editado com sucesso!');
        mutateGlobal('tickets/me', { updatedTicket });

        navigation.goBack();
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
    [navigation],
  );

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Novo chamado</HeaderTitle>
      </Header>
      {/* <View>
        <Picker style={{ width: '100%', color: '#fff' }}>
          <Picker.Item label="Seleciona o tipo" value="0" />
          <Picker.Item label="Máquina não parada" value="Máquina não parada" />
          <Picker.Item label="Máquina parada" value="Máquina parada" />
          <Picker.Item label="Pendência jurídica" value="Pendência jurídica" />
        </Picker>
      </View> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Form ref={formRef} onSubmit={handleCreateTicket}>
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
              <Picker
                ref={equipmentInputRef}
                name="equipment"
                icon="settings"
                placeholder="Equipamento"
                returnKeyType="next"
                onSubmitEditing={() => {
                  typeInputRef.current?.focus();
                }}
              >
                <Picker.Item label="Seleciona o tipo" value="0" />
                <Picker.Item
                  label="Máquina não parada"
                  value="Máquina não parada"
                />
                <Picker.Item label="Máquina parada" value="Máquina parada" />
                <Picker.Item
                  label="Pendência jurídica"
                  value="Pendência jurídica"
                />
              </Picker>
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
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
export default CreateUserTicket;
