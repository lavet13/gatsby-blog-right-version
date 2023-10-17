import { Box, Container } from '@chakra-ui/react';
import React, { FC, PropsWithChildren } from 'react';

import { Slice } from 'gatsby';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxW='container.lg' py='2'>
      <Slice alias='header' />
      <Box as='main'>{children}</Box>
    </Container>
  );
};

export default Layout;
