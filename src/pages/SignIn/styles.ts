import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #100f12;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const ImageLogo = styled.Image`
  width: 250px;
  height: 125px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #f4ede8;
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #100f12;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #dec81b;
  font-size: 18px;
  margin-left: 16px;
`;
