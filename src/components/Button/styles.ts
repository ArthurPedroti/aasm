import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  type: 'default' | 'error';
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  height: 60px;

  ${props =>
    props.type === 'error' &&
    css`
      background: #c53030;
    `}

  ${props =>
    props.type === 'default' &&
    css`
      background: #dec81b;
    `}

  border-radius: 10px;
  margin-top: 16px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ContainerProps>`
  ${props =>
    props.type === 'error' &&
    css`
      color: #fddede;
    `}

  ${props =>
    props.type === 'default' &&
    css`
      color: #312e38;
    `}
  font-weight: 700;
  font-size: 18px;
`;
