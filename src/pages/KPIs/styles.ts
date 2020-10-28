import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ticket } from './index';

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
  background: #312e38;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 24 : getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #dec81b;
  font-weight: 700;
`;

export const CreateTicketButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CreateTicketButtonText = styled.Text`
  color: #999591;
  font-size: 16px;
  margin-right: 16px;
`;

export const TicketsList = styled(FlatList as new () => FlatList<Ticket>)`
  padding: 32px 24px 16px;
`;

export const TicketType = styled.View`
  align-items: center;
`;
export const TicketTypeText = styled.Text`
  margin-top: 4px;
  color: #f4ede8;
`;

export const IconText = styled.Text`
  color: #f4ede8;
  text-align: center;
`;

export const TicketsListTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #f4ede8;
`;

export const TicketContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const TicketInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const TicketName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #f4ede8;
`;

export const TicketMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const TicketMetaText = styled.Text<ContainerProps>`
  margin-left: 8px;
  ${props => containerVariations[props.type || 'default']}
`;
