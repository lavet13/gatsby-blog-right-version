import React, { FC, useEffect } from 'react';
import type { PageProps } from 'gatsby';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectMessageError,
  selectMessageIsLoading,
  selectMessagesEdges,
  selectMessagesPageInfo,
  selectMessagesTotalCount,
} from '../redux/features/message/message.selector';

import { fetchMessagesStarted } from '../redux/features/message/message.slice';
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

const Messages: FC<PageProps> = () => {
  const dispatch = useDispatch();

  const messageEdges = useSelector(selectMessagesEdges);
  const messagesPageInfo = useSelector(selectMessagesPageInfo);
  const messagesTotalCount = useSelector(selectMessagesTotalCount);
  const messageIsLoading = useSelector(selectMessageIsLoading);
  const messageError = useSelector(selectMessageError);

  useEffect(() => {
    dispatch(fetchMessagesStarted());
  }, []);

  console.log({ messageEdges });
  console.log({ messageError });

  return (
    <Card>
      <CardHeader>
        <Heading size='lg'>Messages :)</Heading>
      </CardHeader>
      <CardBody>
        {messageIsLoading ? (
          <Spinner />
        ) : messageError ? (
          <Alert status='error'>
            <AlertIcon /> <AlertTitle>Error: </AlertTitle>{' '}
            <AlertDescription>{messageError.message}</AlertDescription>
          </Alert>
        ) : (
          <Stack divider={<StackDivider />} spacing='4'>
            {messageEdges.map(({ node, cursor }) => (
              <Box
                display='flex'
                flexDirection='column'
                rowGap={2}
                key={cursor}
              >
                <Heading size='sm' textTransform='uppercase'>
                  Отправитель: {node.sender.username}
                </Heading>
                <Heading size='sm' textTransform='uppercase'>
                  Получатель: {node.receiver.username}
                </Heading>
                <Text fontSize='sm'>Сообщение: {node.text}</Text>
                <Text fontSize='sm'>Сообщение: {node.text}</Text>
              </Box>
            ))}
          </Stack>
        )}
      </CardBody>
    </Card>
  );
};

export default Messages;
