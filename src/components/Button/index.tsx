import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  type?: 'default' | 'error';
}

const Button: React.FC<ButtonProps> = ({ children, type, ...rest }) => (
  <Container type={type || 'default'} {...rest}>
    <ButtonText type={type || 'default'}>{children}</ButtonText>
  </Container>
);

export default Button;
