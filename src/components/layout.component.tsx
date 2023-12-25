import { Box, Container } from '@chakra-ui/react';
import React, { FC, PropsWithChildren } from 'react';

import Header from './header.component';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxW='container.lg' py='2'>
      <Header />
      <Box as='main'>{children}</Box>
    </Container>
  );
};

export default Layout;
