import React, { useRef, useCallback, useState, useEffect } from 'react';
import { TextInput, Alert, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';
import * as Yup from 'yup';

import { Modalize } from 'react-native-modalize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useProtheusFetch } from '../../hooks/useProtheusFetch';
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
  Type,
  Title,
  Section,
  SectionContent,
  TypeOption,
  TypeText,
  Item,
  ItemText,
  FlatTitle,
  HeaderModal,
  FooterText,
} from './styles';

interface CreateTicketFormData {
  client: string;
  equipment: string;
  type: string;
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
  const { data: clients } = useProtheusFetch<Client[]>('clients');

  // search
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(20);
  const [clientsFiltered, setClientsFiltered] = useState<Client[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (clients) {
      const indexOfLastClient = currentPage * clientsPerPage;
      const indexOfFirsClient = indexOfLastClient - clientsPerPage;
      const filteredList = clients.filter((client: Client) => {
        if (
          client.razao_social
            .toLocaleUpperCase()
            .includes(searchValue.toLocaleUpperCase())
        ) {
          return client;
        }
        return null;
      });
      const currentClients = filteredList.slice(
        indexOfFirsClient,
        indexOfLastClient,
      );

      setClientsFiltered(currentClients);
    }
  }, [clients, clientsPerPage, currentPage, searchValue]);

  // useEffect(() => {
  //   apiProtheus
  //     .get('/clients')
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log('error', error);
  //     });
  // }, []);

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
    <Item onPress={() => console.log(item.razao_social)}>
      <ItemText>{item.razao_social.slice(0, 35)}</ItemText>
      <Icon name="chevron-right" size={20} />
    </Item>
  );

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
          data: clientsFiltered,
          renderItem,
          keyExtractor: (item: Client) => item.cnpj,
          showsVerticalScrollIndicator: false,
          ListHeaderComponent: (
            <HeaderModal>
              <FlatTitle>Clientes</FlatTitle>
              <SearchInput
                value={searchValue}
                onChangeText={setSearchValue}
                placeholder="Qual comida você procura?"
              />
            </HeaderModal>
          ),
          ListFooterComponent: (
            <HeaderModal>
              <FooterText>Para mais resultados use a pesquisa!</FooterText>
            </HeaderModal>
          ),
        }}
        childrenStyle={{ padding: 24 }}
        keyboardAvoidingBehavior="height"
      />
      <Container>
        <Form ref={formRef} onSubmit={handleCreateTicket}>
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