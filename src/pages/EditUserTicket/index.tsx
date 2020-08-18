import React, { useRef, useCallback, useState, useEffect } from 'react';
import { TextInput, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { mutate as mutateGlobal } from 'swr';
import * as Yup from 'yup';

import { Modalize } from 'react-native-modalize';
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
  SectionMetaTitle,
  SectionError,
  SectionContent,
  TypeOption,
  TypeText,
  Item,
  ItemText,
  FlatTitle,
  HeaderModal,
  FooterText,
  ItemContent,
} from './styles';

interface RouteParams {
  ticket: {
    id: string;
    client_id: string;
    client_name: string;
    client_cnpj: string;
    equipment: string;
    type: string;
    description: string;
  };
}

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

const EditUserTicket: React.FC = () => {
  const route = useRoute();
  const { ticket } = route.params as RouteParams;

  const modalizeRef = useRef<Modalize>(null);
  const [selectedType, setSelectedType] = useState(ticket.type);
  const { data: clients } = useProtheusFetch<Client[]>('clients');
  const [selectedClient, setSelectedClient] = useState<Client>({
    codigo_cliente: ticket.client_id,
    razao_social: ticket.client_name,
    cnpj: ticket.client_cnpj,
    inscricao_estadual: '',
    endereco: '',
    bairro: '',
    municipio: '',
    uf: '',
    cep: '',
    contato: '',
    email: '',
    telefone: '',
  });
  const [clientError, setClientError] = useState(false);
  const [typeError, setTypeError] = useState('');

  // search
  const [clientsFiltered, setClientsFiltered] = useState<Client[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const equipmentInputRef = useRef<TextInput>(null);
  const typeInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (clients) {
      // current page = 1 / clientsPerPage = 20
      const indexOfLastClient = 1 * 20;
      const indexOfFirsClient = indexOfLastClient - 20;
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
  }, [clients, searchValue]);

  const handleSelectClient = useCallback(item => {
    setSelectedClient(item);
    modalizeRef.current?.close();
  }, []);

  const onOpen = useCallback(() => {
    modalizeRef.current?.open();
  }, []);

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
        setTypeError('');
        setClientError(false);

        const schema = Yup.object().shape({
          equipment: Yup.string().required('Equipamento obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
        });
        if (selectedClient.codigo_cliente === undefined) {
          setClientError(true);
          await schema.validate(data, {
            abortEarly: false,
          });
          return;
        }
        if (selectedType === '') {
          setTypeError('Selecione o tipo!');
          return;
        }

        await schema.validate(data, {
          abortEarly: false,
        });

        const completeData = {
          ...data,
          client_id: selectedClient.codigo_cliente,
          client_name: selectedClient.razao_social,
          client_cnpj: selectedClient.cnpj,
          type: selectedType,
        };

        const updatedTicket = await api.put(
          `/tickets/${ticket.id}/me`,
          completeData,
        );

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
    [navigation, selectedClient, selectedType, ticket],
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

        <HeaderTitle>Editar chamado</HeaderTitle>
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
                placeholder="Qual cliente você procura?"
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
        <Form initialData={ticket} ref={formRef} onSubmit={handleCreateTicket}>
          <Select
            autoCapitalize="words"
            error={clientError}
            action={onOpen}
            icon="user"
            placeholder="Cliente"
            value={selectedClient.razao_social}
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
            <SectionMetaTitle>
              <Title>Escolha o tipo</Title>
              <SectionError>{typeError}</SectionError>
            </SectionMetaTitle>
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
            Salvar
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default EditUserTicket;
