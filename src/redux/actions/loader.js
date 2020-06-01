import { ACTION_FULFILLED, ACTION_PENDING } from './types/loaderTypes.js';

export const fulfilledAction = () => ({
  type: ACTION_FULFILLED
});

export const pendingAction = () => ({
  type: ACTION_PENDING
});
