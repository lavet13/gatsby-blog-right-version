import React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import Layout from './src/components/layout.component';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
}) => <Layout>{element}</Layout>;
