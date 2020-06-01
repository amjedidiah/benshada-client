import { ACTION_FULFILLED, ACTION_PENDING } from './types/loaderTypes';

export const fulfilledAction = () => ({
  type: ACTION_FULFILLED
});

export const pendingAction = () => ({
  type: ACTION_PENDING
});
