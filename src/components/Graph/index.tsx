import React from 'react';
import { Dimensions } from 'react-native';
import theme, { Box } from '../Theme';
import Underlay from '../Underlay';

const { width: wWidth } = Dimensions.get('window');
const aspectRation = 195 / 305;

interface Point {
  data: number;
  value: number;
}

interface GraphProps {
  data: Point[];
}

const Graph = ({ data }: GraphProps): any => {
  const margin = 'xl';
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * aspectRation;
  const width = canvasWidth - theme.spacing[margin];
  const height = canvasHeight - theme.spacing[margin];
  const step = width / data.length;
  const values = data.map(p => p.value);
  const datas = data.map(p => p.data);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  return (
    <Box
      marginTop="xl"
      paddingBottom={margin}
      paddingLeft={margin}
      alignItems="center"
    >
      <Underlay minY={minY} maxY={maxY} data={datas} step={step} />
      <Box width={width} height={height}>
        {data.map((point, i) => {
          if (point.value === 0) {
            return null;
          }
          return (
            <Box
              key={point.data * Math.random()}
              position="absolute"
              left={i * step}
              bottom={0}
              width={step}
              height={(point.value / maxY) * height + 10}
            >
              <Box
                backgroundColor="primary"
                position="absolute"
                top={0}
                bottom={0}
                left={theme.spacing.m}
                right={theme.spacing.m}
                opacity={0.1}
                borderTopLeftRadius={16}
                borderTopRightRadius={16}
              />
              <Box
                backgroundColor="primary"
                position="absolute"
                top={0}
                height={22}
                left={theme.spacing.m}
                right={theme.spacing.m}
                borderRadius={22}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
