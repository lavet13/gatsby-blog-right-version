import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import SEO from '../components/seo.component';

const IndexPage: React.FC<PageProps> = () => {
  return <h1>Index Page</h1>;
};

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
