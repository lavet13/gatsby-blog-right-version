import React from 'react';
import type { GatsbySSR } from 'gatsby';

import Layout from './src/components/layout.component';
import { ChakraWrapper } from './src/@chakra-ui/gatsby-plugin/chakra-wrapper';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './src/@chakra-ui/gatsby-plugin/theme';

import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloWrapper } from './src/apollo/apollo-wrapper';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key='chakra-ui-no-flash'
    />,
  ]);
};

export const wrapRootElement: GatsbySSR['wrapRootElement'] = (
  { element },
  pluginOptions
) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloWrapper>
        <ChakraWrapper {...pluginOptions}>{element}</ChakraWrapper>
      </ApolloWrapper>
    </PersistGate>
  </Provider>
);

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
  <Layout>{element}</Layout>
);
