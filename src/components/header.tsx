import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

import type { SliceComponentProps } from 'gatsby';

import ThemeToggle from './toggle-theme.component';
import useIsClient from '../hooks/use-is-client';

const Header: FC<SliceComponentProps> = ({ sliceContext }) => {
  const { isClient, key } = useIsClient();

  return (
    <Flex key={key} as='nav' justifyContent='flex-end'>
      {isClient && <ThemeToggle />}
    </Flex>
  );
};

export default Header;
