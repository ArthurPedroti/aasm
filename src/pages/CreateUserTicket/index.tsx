import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';
import * as Yup from 'yup';

import { Modalize } from 'react-native-modalize';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  Type,
  Title,
  Section,
  SectionContent,
  TypeOption,
  TypeText,
  Item,
  ItemText,
  FlatTitle,
} from './styles';
import { useFetchUrl } from '../../hooks/useFetchUrl';

interface CreateTicketFormData {
  client: string;
  equipment: string;
  type: string;
  description: string;
}

interface FlatItemProps {
  item: Item;
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

const items = [
  {
    name: 'Arthur',
  },
  {
    name: 'João',
  },
  {
    name: 'Carlos',
  },
  {
    name: 'Rodolfo',
  },
];

const types = [
  {
    name: 'Máquina não parada',
  },
  {
    name: 'Máquina parada',
  },
  {
    name: 'Pendência jurídica',
  },
];

const CreateUserTicket: React.FC = () => {
  // const { data: clients } = useFetchUrl<Client[]>(
  //   'https://jsonplaceholder.typicode.com/todos/1',
  // );
  const modalizeRef = useRef<Modalize>(null);
  const [selectedType, setSelectedType] = useState('');
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      try {
        const categoriesList = await axios({
          url: 'clients',
          baseURL: 'https://192.168.2.250',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });
        setClients(categoriesList.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadCategories();
  }, [setClients]);

  const onOpen = (): void => {
    modalizeRef.current?.open();
  };

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const equipmentInputRef = useRef<TextInput>(null);
  const typeInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const handleTypeChanged = useCallback(
    (type: string) => {
      setSelectedType(type);
    },
    [setSelectedType],
  );

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

  const renderItem = ({ item }: FlatItemProps): React.ReactNode => (
    <Item>
      <ItemText>{item.name}</ItemText>
      <Icon name="chevron-right" size={20} />
    </Item>
  );

  const headerList = (): React.ReactNode => <FlatTitle>Clientes</FlatTitle>;

  return (
    <>
      <Header>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Novo chamado</HeaderTitle>
      </Header>
      <Modalize
        ref={modalizeRef}
        flatListProps={{
          data: items,
          renderItem,
          keyExtractor: (item: Item) => item.name,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: headerList,
        }}
        childrenStyle={{ padding: 24 }}
        snapPoint={180}
      />
      <Container>
        <Form ref={formRef} onSubmit={handleCreateTicket}>
          <TouchableOpacity onPress={onOpen}>
            <Text style={{ color: '#fff' }}>Modal</Text>
          </TouchableOpacity>
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
          <Select
            autoCapitalize="words"
            name="client"
            action={onOpen}
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
          <Type>
            <Title>Escolha o tipo</Title>
            <Section>
              <SectionContent>
                {types.map(option => (
                  <TypeOption
                    selected={selectedType === option.name}
                    key={option.name}
                    onPress={() => handleTypeChanged(option.name)}
                  >
                    <TypeText selected={selectedType === option.name}>
                      {option.name}
                    </TypeText>
                  </TypeOption>
                ))}
              </SectionContent>
            </Section>
          </Type>
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
export default CreateUserTicket;
