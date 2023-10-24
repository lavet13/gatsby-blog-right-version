import React, { FC, useEffect } from 'react';
import type { HeadFC, PageProps } from 'gatsby';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectRoles,
  selectRolesError,
  selectRolesIsLoading,
} from '../redux/features/role/role.selector';

import { fetchRolesStarted } from '../redux/features/role/role.slice';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import SEO from '../components/seo.component';

const Roles: FC<PageProps> = () => {
  const dispatch = useDispatch();

  const roles = useSelector(selectRoles);
  const rolesError = useSelector(selectRolesError);
  const rolesIsLoading = useSelector(selectRolesIsLoading);

  useEffect(() => {
    dispatch(fetchRolesStarted());
  }, []);

  return (
    <Card>
      <CardHeader>
        <Heading size='lg'>Roles :)</Heading>
      </CardHeader>
      <CardBody>
        {rolesIsLoading ? (
          <Spinner />
        ) : rolesError ? (
          <Alert status='error'>
            <AlertIcon /> <AlertTitle>Error: </AlertTitle>{' '}
            <AlertDescription>{rolesError.message}</AlertDescription>
          </Alert>
        ) : (
          <Stack divider={<StackDivider />} spacing='4'>
            {roles.map(role => (
              <Box
                display='flex'
                flexDirection='column'
                rowGap={2}
                key={role.id}
              >
                <Heading size='sm' textTransform='uppercase'>
                  Роль: {role.name}
                </Heading>
                <Heading size='sm' textTransform='uppercase'>
                  Пользователи:{' '}
                  {role.users?.map(user => (
                    <Text key={user.id}>{user.username}</Text>
                  ))}
                </Heading>
              </Box>
            ))}
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default Roles;

export const Head: HeadFC = () => <SEO />;
