import React, { useState, useEffect } from 'react';

import * as d3 from 'd3';
import { useFetch } from '../../hooks/useFetch';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  KPIWrap,
  ChartTitle,
  ChartSubTitle,
  SectionContent,
  FlagOption,
  FlagText,
} from './styles';
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
  const [ticketsAttendedPerMonth, setTicketsAttendedPerMonth] = useState([]);
  const [ticketsAttendedPerUser, setTicketsAttendedPerUser] = useState([]);

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

      // ticketAttended
      const ticketAttendedFiltered = data.filter(
        (item: any) => item.status === 'Atendido',
      );
      const ticketAttendedD3 = d3.rollup(
        ticketAttendedFiltered,
        a => a.length,
        (b: any) => new Date(b.created_at).getMonth() + 1,
      );

      const ticketAttended = Array.from(ticketAttendedD3)
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

      setTicketsAttendedPerMonth(ticketAttended);

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

      setTicketsPerUser(ticketPerUser);

      // ticketAttendedPerUser
      const ticketAttendedPerUserD3 = d3.rollup(
        ticketAttendedFiltered,
        a => a.length,
        (b: any) => b.user.name,
      );

      const ticketAttendedPerUser = Array.from(ticketAttendedPerUserD3)
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

      setTicketsAttendedPerUser(ticketAttendedPerUser);
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
          <KPIWrap>
            <ChartTitle>Chamados abertos por mês</ChartTitle>
            <ChartSubTitle>(últimos 6 meses)</ChartSubTitle>
            <Graph data={ticketsPerMonth} />
          </KPIWrap>
        ) : null}
        {ticketsAttendedPerMonth.length > 0 ? (
          <KPIWrap>
            <ChartTitle>Chamados atendidos por mês</ChartTitle>
            <ChartSubTitle>(últimos 6 meses)</ChartSubTitle>
            <Graph data={ticketsAttendedPerMonth} />
          </KPIWrap>
        ) : null}
        {ticketsPerMonth.length > 0 ? (
          <KPIWrap>
            <ChartTitle>Chamados abertos por usuário</ChartTitle>
            <SectionContent>
              {ticketsPerUser.map((ticket: Point) => (
                <FlagOption key={ticket.data}>
                  <FlagText>
                    {ticket.data}: {ticket.value}
                  </FlagText>
                </FlagOption>
              ))}
            </SectionContent>
          </KPIWrap>
        ) : null}
        {ticketsAttendedPerUser.length > 0 ? (
          <KPIWrap>
            <ChartTitle>Chamados atendidos por usuário</ChartTitle>
            <SectionContent>
              {ticketsAttendedPerUser.map((ticket: Point) => (
                <FlagOption key={ticket.data}>
                  <FlagText>
                    {ticket.data}: {ticket.value}
                  </FlagText>
                </FlagOption>
              ))}
            </SectionContent>
          </KPIWrap>
        ) : null}
      </Container>
    </>
  );
};

export default KPIs;
