import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Text } from '../Theme';

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
}

const Underlay = ({ dates, minY, maxY }: UnderlayProps): any => {
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box />
      <Box marginLeft="l">
        {dates.map((date, index) => (
          <Text>Tesxt</Text>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
