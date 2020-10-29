import React from 'react';
import { format } from 'date-fns';
import { StyleSheet } from 'react-native';
import ptBR from 'date-fns/locale/pt-BR';
import theme, { Box, Text } from '../Theme';

interface UnderlayProps {
  dates: number[];
  minY: number;
  maxY: number;
  step: number;
}

const Underlay = ({ dates, minY, maxY, step }: UnderlayProps): any => {
  const row_height = 16;
  const lerp = (v0: number, v1: number, t: number): number =>
    (1 - t) * v0 + t * v1;

  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map(p => {
          return (
            <Box
              key={p}
              flexDirection="row"
              alignItems="center"
              height={row_height}
              style={{
                top: p === 0 ? row_height / 2 : p === 1 ? -row_height / 2 : 0,
              }}
            >
              <Box width={theme.spacing.xl} paddingRight="s">
                <Text color="white" textAlign="right">
                  {Math.round(p * maxY)}
                </Text>
              </Box>
              <Box flex={1} height={1} backgroundColor="white" opacity={0.1} />
            </Box>
          );
        })}
      </Box>
      <Box
        marginLeft="xl"
        height={theme.spacing.xl}
        flexDirection="row"
        alignItems="center"
      >
        {dates.map(date => (
          <Box width={step}>
            <Text
              color="white"
              textAlign="center"
              style={{ textTransform: 'capitalize' }}
            >
              {format(new Date(date), 'LLL', { locale: ptBR })}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
