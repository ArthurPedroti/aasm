import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon, Placeholder } from './styles';

interface InputProps extends TextInputProps {
  error: boolean;
  action: Function;
  icon: string;
  containerStyle?: object;
}

interface InputRef {
  focus(): void;
}

const Select: React.RefForwardingComponent<InputRef, InputProps> = ({
  error,
  value,
  placeholder,
  action,
  icon,
  containerStyle = {},
  ...rest
}) => {
  return (
    <Container
      onPress={() => action()}
      style={containerStyle}
      isErrored={error}
    >
      <Icon name={icon} size={20} color={value ? '#dec81b' : '#666360'} />
      {value ? (
        <TextInput
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          onFocus={() => action()}
          {...rest}
        >
          {value}
        </TextInput>
      ) : (
        <Placeholder>{placeholder}</Placeholder>
      )}

      <Icon name="chevron-down" size={20} color={value ? '#fff' : '#666360'} />
    </Container>
  );
};

export default Select;
