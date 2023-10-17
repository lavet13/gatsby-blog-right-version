import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react';

import React, { FC } from 'react';
import theme from './theme';

export const ChakraWrapper: FC<ChakraProviderProps> = ({
  children,
  resetCSS = true,
}) => {
  return (
    <ChakraProvider theme={theme} resetCSS={resetCSS}>
      {children}
    </ChakraProvider>
  );
};
