import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { ListItem } from './index';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  min-height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;

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

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const SelectMeta = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const SelectText = styled.Text`
  color: #666360;
  font-size: 16px;
`;

export const Options = styled(FlatList as new () => FlatList<ListItem>)`
  padding: 32px 24px 16px;
`;

export const OptionMeta = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;
export const OptionText = styled.Text`
  color: #666360;
  font-size: 16px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;
