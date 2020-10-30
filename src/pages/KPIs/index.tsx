import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { acc } from 'react-native-reanimated';
import * as d3 from 'd3';
import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderTitle, UserName } from './styles';
import Graph from '../../components/Graph';

export interface GraphData {
  date: number;
  value: number;
}

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
  const [tickets, setTickets] = useState<GraphData[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const clientsPerPage = 3;

  useEffect(() => {
    if (data !== undefined) {
      if (Array.isArray(data) === false) {
        return;
      }

      const dataFormatted = data.map((p: Ticket) => {
        const n = {
          value: 1,
          year: new Date(p.created_at).getFullYear(),
          month: new Date(p.created_at).getMonth(),
        };
        return n;
      });
      console.log(dataFormatted);

      const expenses = [
        { name: 'jim', amount: 34, date: '11/12/2015' },
        { name: 'carl', amount: 120.11, date: '11/12/2015' },
        { name: 'jim', amount: 45, date: '12/01/2015' },
        { name: 'stacy', amount: 12.0, date: '01/04/2016' },
        { name: 'stacy', amount: 34.1, date: '01/04/2016' },
        { name: 'stacy', amount: 44.8, date: '01/05/2016' },
      ];

      const expensesByName = d3.rollup(
        data,
        a => a.length,
        b => new Date(b.created_at).getMonth(),
      );

      console.log(expensesByName);

      // const teste = d3.group(dataFormatted, item => item.year);
      // console.log(teste);
    }
  }, [data]);

  return (
    <Container>
      <Header>
        <HeaderTitle onPress={() => signOut()}>
          <UserName>Indicadores</UserName>
        </HeaderTitle>
      </Header>
      <Graph data={tickets} />
    </Container>
  );
};

export default KPIs;
