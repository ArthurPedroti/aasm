import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  min-height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;
  position: relative;
  overflow: hidden;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #dec81b;
    `}
`;

export const TextInput = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

export const Placeholder = styled.Text`
  flex: 1;
  color: #666360;
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
