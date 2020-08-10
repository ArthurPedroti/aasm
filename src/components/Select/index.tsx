import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, View, TouchableOpacity, Text } from 'react-native';
import { useField } from '@unform/core';
import { Modalize } from 'react-native-modalize';

import {
  Container,
  SelectMeta,
  TextInput,
  SelectText,
  Icon,
  Options,
  OptionMeta,
  OptionText,
} from './styles';

const items = [
  {
    name: 'Arthur',
  },
  {
    name: 'João',
  },
  {
    name: 'Carlos',
  },
  {
    name: 'Rodolfo',
  },
];

export interface ListItem {
  name: string;
}

interface InputProps extends TextInputProps {
  name: string;
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
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (): void => {
    modalizeRef.current?.open();
  };

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
    <>
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}
        onPress={onOpen}
      >
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#dec81b' : '#666360'}
        />

        <SelectMeta>
          <SelectText>{inputValueRef.current.value}</SelectText>
          <Icon
            name="chevron-down"
            size={20}
            color={isFocused || isFilled ? '#dec81b' : '#666360'}
          />
        </SelectMeta>
      </Container>

      <Modalize ref={modalizeRef} snapPoint={180}>
        <Options
          data={items}
          keyExtractor={item => item.name}
          ListFooterComponent={<View style={{ margin: 32 }} />}
          renderItem={({ item }) => (
            <OptionMeta
              onPress={() => {
                inputValueRef.current.value = item.name;
              }}
            >
              <OptionText>{item.name}</OptionText>
              <Icon
                name="chevron-right"
                size={20}
                color={isFocused || isFilled ? '#dec81b' : '#666360'}
              />
            </OptionMeta>
          )}
        />
      </Modalize>
    </>
  );
};

export default forwardRef(Select);
