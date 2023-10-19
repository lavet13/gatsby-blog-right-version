import React, { FC } from 'react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

import type { PageProps, SliceComponentProps } from 'gatsby';

type ThemeToggleProps = {
  colorScheme?: string;
};

const ThemeToggle: FC<
  Partial<ThemeToggleProps & PageProps & SliceComponentProps>
> = ({ colorScheme }) => {
  const { toggleColorMode: toggleMode } = useColorMode();

  const ToggleIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      colorScheme={colorScheme}
      variant='ghost'
      icon={<ToggleIcon />}
      aria-label='Toggle Theme'
      onClick={toggleMode}
    />
  );
};

export default ThemeToggle;
