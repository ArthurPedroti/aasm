import React from 'react';
import { StyleSheet } from 'react-native';
import theme, { Box, Text } from '../Theme';

interface UnderlayProps {
  data: number[];
  minY: number;
  maxY: number;
  step: number;
}

const Underlay = ({ data, maxY, step }: UnderlayProps): any => {
  const row_height = 16;

  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map(p => {
          return (
            <Box
              key={Math.random()}
              flexDirection="row"
              alignItems="center"
              height={row_height}
              style={{
                // eslint-disable-next-line no-nested-ternary
                top: p === 0 ? row_height / 2 : p === 1 ? -row_height / 2 : 0,
              }}
            >
              <Box
                key={Math.random()}
                width={theme.spacing.xl}
                paddingRight="s"
              >
                <Text color="white" textAlign="center">
                  {Math.round(p * maxY)}
                </Text>
              </Box>
              <Box flex={1} height={1} backgroundColor="white" opacity={0.1} />
            </Box>
          );
        })}
      </Box>
      <Box
        key={Math.random()}
        marginLeft="l"
        height={theme.spacing.xl}
        flexDirection="row"
        alignItems="center"
      >
        {data.map(item => (
          <Box key={Math.random()} width={step}>
            <Text
              key={step * Math.random()}
              color="white"
              textAlign="center"
              style={{ textTransform: 'capitalize' }}
            >
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
