import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  background: #312e38;
  padding: 0px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${Platform.OS === 'android' ? 24 : getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #dec81b;
  font-weight: 700;
`;

export const KPIWrap = styled.View`
  margin-bottom: 16px;
`;

export const ChartTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
`;

export const ChartSubTitle = styled.Text`
  color: #7a758d;
  font-size: 16px;
`;

export const SectionContent = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const FlagOption = styled(RectButton)`
  padding: 12px;
  background: #3e3b47;
  border-radius: 10px;
  margin-right: 8px;
`;

export const FlagText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
`;
