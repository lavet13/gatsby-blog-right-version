import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import Layout from './src/components/layout.component';
import { ChakraWrapper } from './src/@chakra-ui/gatsby-plugin/chakra-wrapper';

import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloWrapper } from './src/apollo/apollo-wrapper';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
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

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <Layout>{element}</Layout>;
