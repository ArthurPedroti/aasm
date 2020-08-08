import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { PickerProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextPicker, Icon } from './styles';

interface PickerInterfaceProps extends PickerProps {
  name: string;
  icon: string;
  containerStyle?: object;
}

interface PickerValueReference {
  value: string;
}

interface PickerRef {
  focus(): void;
}

const Picker: React.RefForwardingComponent<PickerRef, PickerInterfaceProps> = (
  { name, icon, containerStyle = {}, children, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<PickerValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handlePickerFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handlePickerBlur = useCallback(() => {
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
      setValue(value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#dec81b' : '#666360'}
      />

      <TextPicker
        ref={inputElementRef}
        onValueChange={value => {
          console.log(value);
          inputValueRef.current.value = value;
        }}
        {...rest}
      >
        {children}
      </TextPicker>
    </Container>
  );
};

export default forwardRef(Picker);
