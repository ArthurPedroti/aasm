import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

interface TypeProps {
  selected: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
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

export const Type = styled.View``;

export const Title = styled.Text`
  color: #999591;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Section = styled.View`
  margin-bottom: 16px;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const TypeOption = styled(RectButton)<TypeProps>`
  padding: 12px;
  background: ${props => (props.selected ? '#dec81b' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;
`;

export const TypeText = styled.Text<TypeProps>`
  color: ${props => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
`;

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const ItemText = styled.Text`
  flex: 1;
  font-size: 16px;
`;

export const FlatTitle = styled.Text`
  font-size: 24px;
  align-self: center;
  margin-bottom: 12px;
`;

export const HeaderModal = styled.View`
  margin-bottom: 20px;
`;

export const FooterText = styled.Text`
  color: #3e3b47;
  margin-top: 30px;
  align-self: center;
`;

export const ItemContent = styled.View``;
