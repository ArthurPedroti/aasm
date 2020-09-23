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

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const TicketWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TicketContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 0 4px 0;
`;

export const TicketLine = styled.View`
  background: #dec81b;
  height: 100%;
  width: 3px;
  transform: translateX(9px);
`;

export const TicketUpdateMeta = styled.View`
  flex: 1;
  margin-left: 12px;
  background: #3e3b47;
  padding: 8px;
  border-radius: 8px;
`;

export const TicketUpdateTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #f4ede8;
`;

export const TicketUpdateDescription = styled.Text`
  font-size: 16px;
  margin-top: 6px;
  color: #f4ede8;
`;

export const TicketActions = styled.View`
  flex-direction: row;
  margin-left: auto;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 4px 8px;
  margin: 4px;
  border-radius: 4px;
  background: #f4ede8;
`;

export const ButtonText = styled.Text``;
