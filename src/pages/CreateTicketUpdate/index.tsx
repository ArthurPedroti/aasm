import React, { useRef, useCallback, useState, useEffect } from 'react';
import { TextInput, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';
import * as Yup from 'yup';

import { Modalize } from 'react-native-modalize';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import SearchInput from '../../components/SearchInput';

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
  Item,
  ItemText,
  FlatTitle,
  HeaderModal,
  FooterText,
  ItemContent,
} from './styles';

interface CreateTicketFormData {
  title: string;
  flag: string;
  description: string;
}

interface FlatItemProps {
  item: Client;
}

interface Item {
  name: string;
}

export interface Client {
  codigo_cliente: string;
  razao_social: string;
  cnpj: string;
  inscricao_estadual: string;
  endereco: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  contato: string;
  email: string;
  telefone: string;
}

const flags = [
  {
    name: 'Aguardando classificação',
  },
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
  const modalizeRef = useRef<Modalize>(null);
  const [selectedFlag, setSelectedFlag] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client>({} as Client);
  const [flagError, setFlagError] = useState('');

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const equipmentInputRef = useRef<TextInput>(null);
  const flagInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handleSelectClient = useCallback(item => {
    setSelectedClient(item);
    modalizeRef.current?.close();
  }, []);

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
          flag: Yup.string().required('Equipamento obrigatório'),
          description: Yup.string(),
        });

        const schemaWithoutSpecificFlag = Yup.object().shape({
          title: Yup.string().required('Equipamento obrigatório'),
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
            ...data,
            flag: selectedFlag,
          };
        } else {
          completeData = {
            ...data,
          };
        }

        console.log(completeData);
        await api.post(`/ticket-updates`, completeData);

        Alert.alert('Chamado criado com sucesso!');

        navigation.goBack();
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
    [navigation, selectedFlag],
  );

  const renderItem = ({ item }: FlatItemProps): React.ReactNode => (
    <Item onPress={() => handleSelectClient(item)}>
      <ItemContent>
        <ItemText>{item.razao_social.slice(0, 35)}</ItemText>
        {item.cnpj !== '' ? <ItemText>CNPJ: {item.cnpj}</ItemText> : null}
      </ItemContent>
      <Icon name="chevron-right" size={20} />
    </Item>
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
          <Input
            ref={equipmentInputRef}
            autoCapitalize="words"
            name="title"
            icon="type"
            placeholder="Título"
            returnKeyType="next"
            onSubmitEditing={() => {
              flagInputRef.current?.focus();
            }}
          />
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
              name="flag"
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
