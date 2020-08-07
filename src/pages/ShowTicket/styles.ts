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

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TicketType = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TicketTypeMeta = styled.View`
  margin-left: 20px;
`;

export const TicketTypeTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #f4ede8;
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
  flex: 1;
  width: 100%;
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  align-items: flex-start;
`;

export const TicketInfo = styled.View`
  flex: 1;
  margin-top: 20px;
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
