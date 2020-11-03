import React, { useState, useEffect } from 'react';

import * as d3 from 'd3';
import { useFetch } from '../../hooks/useFetch';

import { Container, Header, HeaderTitle, UserName, ChartTitle } from './styles';
import Graph from '../../components/Graph';

interface Point {
  data: number;
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

const KPIs: React.FC = () => {
  const { data } = useFetch<Ticket[]>('tickets');
  const [ticketsPerMonth, setTicketsPerMonth] = useState([]);
  const [ticketsPerUser, setTicketsPerUser] = useState([]);

  useEffect(() => {
    if (data !== undefined) {
      if (Array.isArray(data) === false) {
        return;
      }

      // ticketPerMonth
      const ticketPerMonthD3 = d3.rollup(
        data,
        a => a.length,
        (b: any) => new Date(b.created_at).getMonth() + 1,
      );

      const ticketPerMonth = Array.from(ticketPerMonthD3)
        .reduce((accu: any, value) => {
          const newObj = {
            data: value[0],
            value: value[1],
          };

          accu.push(newObj);

          return accu;
        }, [])
        .slice()
        .sort((a: any, b: any) => d3.ascending(a.data, b.data));

      setTicketsPerMonth(ticketPerMonth);

      // ticketPerUser
      const ticketPerUserD3 = d3.rollup(
        data,
        a => a.length,
        (b: any) => b.user.name,
      );

      const ticketPerUser = Array.from(ticketPerUserD3)
        .reduce((accu: any, value) => {
          const newObj = {
            data: value[0],
            value: value[1],
          };

          accu.push(newObj);

          return accu;
        }, [])
        .slice()
        .sort((a: any, b: any) => d3.ascending(a.data, b.data));

      console.log(ticketPerUser);
    }
  }, [data]);

  return (
    <>
      <Header>
        <HeaderTitle>
          <UserName>Indicadores</UserName>
        </HeaderTitle>
      </Header>
      <Container>
        {ticketsPerMonth.length > 0 ? (
          <>
            <ChartTitle>Chamados abertos por mês</ChartTitle>
            <Graph data={ticketsPerMonth} />
          </>
        ) : null}
        {ticketsPerMonth.length > 0 ? (
          <>
            <ChartTitle>Chamados abertos por usuário</ChartTitle>
            {ticketsPerUser.map(ticket => (
              <UserName>{ticket.data}</UserName>
            ))}
          </>
        ) : null}
      </Container>
    </>
  );
};

export default KPIs;
