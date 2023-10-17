import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

import { Slice } from 'gatsby';
import useIsClient from '../hooks/use-is-client';

const Header: FC = () => {
  const { isClient, key } = useIsClient();

  return (
    <Flex key={key} as='nav' justifyContent='flex-end'>
      {isClient && <Slice alias='theme-toggle' />}
    </Flex>
  );
};

export default Header;
