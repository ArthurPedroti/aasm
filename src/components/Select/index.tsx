import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon, Placeholder } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  action: Function;
  icon: string;
  containerStyle?: object;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Select: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, value, placeholder, action, icon, containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(value2) {
        inputValueRef.current.value = value2;
        inputElementRef.current.setNativeProps({ text: value2 });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      onPress={() => action()}
      style={containerStyle}
      isFocused={isFocused}
      isErrored={!!error}
    >
      <Icon name={icon} size={20} color={value ? '#dec81b' : '#666360'} />
      {value ? (
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          defaultValue={defaultValue}
          onFocus={() => action()}
          onBlur={handleInputBlur}
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

export default forwardRef(Select);
