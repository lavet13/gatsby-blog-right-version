import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

import { Slice } from 'gatsby';
import useIsClient from '../hooks/use-is-client';
import { Link } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';

const Header: FC = () => {
  const { isClient, key } = useIsClient();

  return (
    <Flex key={key} as='nav' justifyContent='flex-end' alignItems='center'>
      <Flex columnGap={3} pr={2}>
        <Link as={GatsbyLink} to='/messages'>
          messages
        </Link>
        <Link as={GatsbyLink} to='/image-url'>
          imageUrl
        </Link>
        <Link as={GatsbyLink} to='/image-url/some-page'>
          some page
        </Link>
        <Link as={GatsbyLink} to='/image-url/image'>
          image
        </Link>
      </Flex>
      {isClient && <Slice alias='theme-toggle' />}
    </Flex>
  );
};

export default Header;
