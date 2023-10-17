import React, { FC, useEffect } from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Router } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';
import useIsClient from '../../hooks/use-is-client';

const Home: FC<RouteComponentProps> = () => {
  return <h1>Home</h1>;
};

const ImagePage: FC<RouteComponentProps> = () => {
  return <h1>Image Page</h1>;
};

const SomePage: FC<RouteComponentProps> = () => {
  return <h1>Some page</h1>;
};

const ImageUrl: FC<PageProps> = () => {
  return (
    <Router>
      <ImagePage path='/image-url/image' />
      <SomePage path='/image-url/some-page' />
    </Router>
  );
};

export default ImageUrl;

export const Head: HeadFC = () => <title>Not found</title>;
