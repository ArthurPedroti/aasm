import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName } from './styles';
import Graph from '../../components/Graph';

export interface Ticket {
  id: string;
  client_name: string;
  class: string;
  equipment: string;
  type: string;
  status: string;
  description: string;
  updated_at: string;
  created_at: string;
}

const data2 = [
  {
    date: new Date('2019-09-01').getTime(),
    value: 30,
  },
  {
    date: new Date('2019-10-01').getTime(),
    value: 40,
  },
  {
    date: new Date('2019-11-01').getTime(),
    value: 200,
  },
  {
    date: new Date('2019-12-01').getTime(),
    value: 120,
  },
  {
    date: new Date('2020-01-01').getTime(),
    value: 70,
  },
  {
    date: new Date('2020-02-01').getTime(),
    value: 50,
  },
];

const KPIs: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();
  const { data } = useFetch<Ticket[]>('tickets');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const clientsPerPage = 3;

  useEffect(() => {
    if (data !== undefined) {
      if (Array.isArray(data) === false) {
        return;
      }

      setTotal(data.length);
      setPage(2);
      setTickets(data.slice(0, clientsPerPage));
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <HeaderTitle onPress={() => signOut()}>
          <UserName>Indicadores</UserName>
        </HeaderTitle>
      </Header>
      <Graph data={data2} />
    </Container>
  );
};

export default KPIs;
