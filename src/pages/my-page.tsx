import React, { FC, useEffect } from 'react';
import type { PageProps, HeadFC } from 'gatsby';
import SEO from '../components/seo.component';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMe,
  selectMeError,
  selectMeIsLoading,
} from '../redux/features/me/me.selector';

import { fetchMeStarted } from '../redux/features/me/me.slice';

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

const MePage: FC<PageProps> = () => {
  const dispatch = useDispatch();

  const me = useSelector(selectMe);
  const meError = useSelector(selectMeError);
  const meIsLoading = useSelector(selectMeIsLoading);

  useEffect(() => {
    dispatch(fetchMeStarted());
  }, []);

  console.log({ me });

  return (
    <Card>
      <CardHeader>
        <Heading size='lg'>Messages :)</Heading>
      </CardHeader>
      <CardBody>
        {meIsLoading ? (
          <Spinner />
        ) : meError ? (
          <Alert status='error'>
            <AlertIcon /> <AlertTitle>Error: </AlertTitle>{' '}
            <AlertDescription>{meError.message}</AlertDescription>
          </Alert>
        ) : (
          <Stack divider={<StackDivider />} spacing='4'>
            <Box display='flex' flexDirection='column' rowGap={2}>
              {me && (
                <>
                  <Text fontSize='sm'>{me?.id}</Text>
                  <Text fontSize='sm'>{me?.username}</Text>
                  <Text fontSize='sm'>{me?.email}</Text>
                  <Text fontSize='sm'>{me?.createdAt}</Text>
                  <Text fontSize='sm'>{me?.updatedAt}</Text>
                </>
              )}
            </Box>
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default MePage;

export const Head: HeadFC = () => <SEO />;
