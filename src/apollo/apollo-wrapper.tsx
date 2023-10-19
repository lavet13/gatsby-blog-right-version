import React, { FC, PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';

export const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
