import React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import Layout from './src/components/layout.component';
import { ChakraWrapper } from './src/@chakra-ui/gatsby-plugin/chakra-root-wrapper';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = (
  { element },
  pluginOptions
) => <ChakraWrapper {...pluginOptions}>{element}</ChakraWrapper>;

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <Layout>{element}</Layout>;
