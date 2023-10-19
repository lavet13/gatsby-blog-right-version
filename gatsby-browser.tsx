import React from 'react';
import type { GatsbyBrowser } from 'gatsby';

import Layout from './src/components/layout.component';
import { ChakraWrapper } from './src/@chakra-ui/gatsby-plugin/chakra-wrapper';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { ApolloWrapper } from './src/apollo/apollo-wrapper';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  { element },
  pluginOptions
) => (
  <Provider store={store}>
    <ApolloWrapper>
      <ChakraWrapper {...pluginOptions}>{element}</ChakraWrapper>
    </ApolloWrapper>
  </Provider>
);

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <Layout>{element}</Layout>;
