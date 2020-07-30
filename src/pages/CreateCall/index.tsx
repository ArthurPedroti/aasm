import React, { useCallback } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, BackButton, HeaderTitle } from './styles';

const CreateCall: React.FC = () => {
  const { goBack } = useNavigation();

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Novo Chamado</HeaderTitle>
      </Header>
    </Container>
  );
};

export default CreateCall;
