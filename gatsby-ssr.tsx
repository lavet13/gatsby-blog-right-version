import React from 'react';
import type { GatsbySSR } from 'gatsby';
import Layout from './src/components/layout.component';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => (
  <Layout>{element}</Layout>
);
