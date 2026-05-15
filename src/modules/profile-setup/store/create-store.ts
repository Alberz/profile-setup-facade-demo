import type { FieldErrors, ProfileSetupDraft, StepId } from '../domain/models/profile-setup';
import { initialProfileSetupState } from './initial-state';

export type ProfileSetupStatus = 'idle' | 'saving' | 'success' | 'error';

export type ProfileSetupState = {
  activeStep: StepId;
  status: ProfileSetupStatus;
  draft: ProfileSetupDraft;
  fieldErrors: FieldErrors;
  error: string | null;
};

type Listener = () => void;

type ProfileSetupStore = {
  getSnapshot: () => ProfileSetupState;
  subscribe: (listener: Listener) => () => void;
  setState: (recipe: (state: ProfileSetupState) => ProfileSetupState) => void;
};

export function createProfileSetupStore(initialState = initialProfileSetupState): ProfileSetupStore {
  let state = structuredClone(initialState);
  const listeners = new Set<Listener>();

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setState(recipe) {
      state = recipe(state);
      listeners.forEach((listener) => listener());
    },
  };
}
