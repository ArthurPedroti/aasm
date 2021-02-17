import React, { useRef, useCallback, useState } from 'react';
import { TextInput, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import apiPromise from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  Flag,
  Title,
  Section,
  SectionMetaTitle,
  SectionError,
  SectionContent,
  FlagOption,
  FlagText,
} from './styles';

interface TicketUpdate {
  id: string;
  ticket_id: string;
  flag: string;
  title: string;
  completed: boolean;
  description: string | null;
  updated_at: string;
  created_at: string;
}

interface RouteParams {
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
  ticket_updates: {
    id: string;
    ticket_id: string;
    flag: string;
    title: string;
    completed: boolean;
    description: string | null;
    updated_at: string;
    created_at: string;
  }[];
}

interface CreateTicketFormData {
  title: string;
  description: string | null;
}

const flags = [
  {
    name: 'Classificado',
  },
  {
    name: 'Primeiro contato',
  },
  {
    name: 'Envio de técnico',
  },
  {
    name: 'Em antendimento',
  },
  {
    name: 'Concluído',
  },
  {
    name: 'Outros',
  },
];

const CreateTicketUpdate: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { ticket, ticket_updates } = route.params as RouteParams;
  const [selectedFlag, setSelectedFlag] = useState('');
  const [flagError, setFlagError] = useState('');

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const equipmentInputRef = useRef<TextInput>(null);
  const flagInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handleFlagChanged = useCallback(
    (flag: string) => {
      setSelectedFlag(flag);
    },
    [setSelectedFlag],
  );

  const handleCreateTicket = useCallback(
    async (data: CreateTicketFormData) => {
      try {
        formRef.current?.setErrors({});
        setFlagError('');

        const schemaWithSpecificFlag = Yup.object().shape({
          title: Yup.string().required('Equipamento obrigatório'),
          description: Yup.string(),
        });

        const schemaWithoutSpecificFlag = Yup.object().shape({
          description: Yup.string(),
        });

        if (selectedFlag === '') {
          setFlagError('Selecione a etapa!');
          return;
        }
        if (selectedFlag === 'Outros') {
          await schemaWithSpecificFlag.validate(data, {
            abortEarly: false,
          });
        } else {
          await schemaWithoutSpecificFlag.validate(data, {
            abortEarly: false,
          });
        }
        let completeData;
        if (selectedFlag !== 'Outros') {
          completeData = {
            ticket_id: ticket.id,
            title: selectedFlag,
          };
        } else {
          completeData = {
            title: data.title,
            ticket_id: ticket.id,
          };
        }

        if (data.description !== '') {
          completeData = {
            ...completeData,
            description: data.description,
          };
        }

        const api = await apiPromise();
        await api.post<TicketUpdate>(`/ticket-updates`, completeData);

        Alert.alert('Chamado criado com sucesso!');
        if (user.role === 'user') {
          navigation.navigate('Dashboard');
        } else {
          navigation.navigate('AdminDashboard');
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao criar a atualização, tente novamente.',
        );
      }
    },
    [navigation, selectedFlag, ticket.id, ticket_updates],
  );

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Nova atualização</HeaderTitle>
      </Header>
      <Container>
        <Form ref={formRef} onSubmit={handleCreateTicket}>
          <Flag>
            <SectionMetaTitle>
              <Title>Escolha a etapa</Title>
              <SectionError>{flagError}</SectionError>
            </SectionMetaTitle>
            <Section>
              <SectionContent>
                {flags.map(option => (
                  <FlagOption
                    selected={selectedFlag === option.name}
                    key={option.name}
                    onPress={() => handleFlagChanged(option.name)}
                  >
                    <FlagText selected={selectedFlag === option.name}>
                      {option.name}
                    </FlagText>
                  </FlagOption>
                ))}
              </SectionContent>
            </Section>
          </Flag>
          {selectedFlag === 'Outros' && (
            <Input
              ref={equipmentInputRef}
              autoCapitalize="words"
              name="title"
              icon="flag"
              placeholder="Digite o nome da etapa"
              returnKeyType="next"
              onSubmitEditing={() => {
                flagInputRef.current?.focus();
              }}
            />
          )}
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
    </>
  );
};
export default CreateTicketUpdate;
