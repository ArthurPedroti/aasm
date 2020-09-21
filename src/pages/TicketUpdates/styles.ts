import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  type?: 'success' | 'info' | 'alert' | 'error' | 'default';
}

const containerVariations = {
  success: css`
    color: #78da55;
  `,
  info: css`
    color: #e6fffa;
  `,
  default: css`
    color: #999591;
  `,
  alert: css`
    color: #dec81b;
  `,
  error: css`
    color: #c53030;
  `,
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Header = styled.View`
  padding: 24px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  margin-right: auto;
  margin-left: 16px;
`;

export const TicketUpdateMeta = styled.View`
  padding: 8px;
  background: #3e3b47;
  border-radius: 10px;
  margin-left: 8px;
`;

export const TicketUpdateText = styled.Text`
  font-size: 16px;
  color: #f4ede8;
`;

export const IconText = styled.Text`
  color: #f4ede8;
  text-align: center;
`;

export const TicketActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const ActionButton = styled.TouchableOpacity`
  background: #f4ede8;
  padding: 4px 8px;
  margin: 4px;
  border-radius: 4px;
`;

export const TextButton = styled.Text``;
