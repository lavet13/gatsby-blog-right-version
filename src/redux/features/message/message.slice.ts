import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { MessageConnection, rawMessageConnection } from './message.types';

import { formatISO } from 'date-fns';

import type {} from '@apollo/client';

export type MessageState = {
  readonly messageIsLoading: boolean;
  readonly messageError: string | null;
  readonly messages: MessageConnection;
};

const initialState: MessageState = {
  messageIsLoading: false,
  messageError: null,
  messages: {
    edges: [],
    pageInfo: {
      hasNextPage: false,
    },
    totalCount: 0,
  },
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessagesStarted(state, _: PayloadAction<void>) {
      state.messageIsLoading = true;
    },

    fetchMessagesSucceeded: {
      reducer(state, action: PayloadAction<MessageConnection>) {
        state.messages = action.payload;
      },

      prepare(messages: rawMessageConnection) {
        return {
          payload: {
            ...messages,
            edges: messages.edges.map(({ cursor, node }) => ({
              cursor,
              node: {
                ...node,
                updatedAt: node.updatedAt
                  ? formatISO(node.updatedAt)
                  : undefined,
                createdAt: node.createdAt
                  ? formatISO(node.createdAt)
                  : undefined,
              },
            })),
          },
        };
      },
    },

    fetchMessagesFailed: {
      reducer(state, action: PayloadAction<string>) {
        state.messageError = action.payload;
      },
      prepare(error: Error) {
        return { payload: JSON.stringify(error) };
      },
    },

    messageErrorsReset(state) {
      state.messageError = null;
    },

    messageLoadingReset(state) {
      state.messageIsLoading = false;
    },
  },
});

export default messagesSlice.reducer;

export const {
  fetchMessagesFailed,
  fetchMessagesStarted,
  fetchMessagesSucceeded,
  messageErrorsReset,
  messageLoadingReset,
} = messagesSlice.actions;
