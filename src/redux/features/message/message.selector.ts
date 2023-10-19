import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectMessageReducer = (state: RootState) => state.messages;

export const selectMessagesEdges = createSelector(
  [selectMessageReducer],
  messagesSlice => messagesSlice.messages.edges
);

export const selectMessagesPageInfo = createSelector(
  [selectMessageReducer],
  messagesSlice => messagesSlice.messages.pageInfo
);

export const selectMessagesTotalCount = createSelector(
  [selectMessageReducer],
  messagesSlice => messagesSlice.messages.totalCount
);

export const selectMessageIsLoading = createSelector(
  [selectMessageReducer],
  messagesSlice => messagesSlice.messageIsLoading
);

export const selectMessageError = createSelector(
  [selectMessageReducer],
  messageSlice =>
    messageSlice.messageError ? JSON.parse(messageSlice.messageError) : null
);
