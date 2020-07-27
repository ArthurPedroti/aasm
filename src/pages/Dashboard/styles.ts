import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform, FlatList } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 24 : getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #f7df1e;
  /* font-family: 'RobotoSlab-Medium'; */
  font-weight: 700;
`;

export const ProvidersList = styled.FlatList``;
