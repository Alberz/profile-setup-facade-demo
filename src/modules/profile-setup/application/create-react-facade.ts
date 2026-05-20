import { useSyncExternalStore } from 'react';
import type { ProfileSetupCore, CreateProfileSetupCoreOptions } from './create-profile-setup-core';
import { createProfileSetupCore } from './create-profile-setup-core';

function isProfileSetupCore(value: ProfileSetupCore | CreateProfileSetupCoreOptions): value is ProfileSetupCore {
  return 'subscribe' in value && 'actions' in value;
}

export function createProfileSetupReactFacade(source: ProfileSetupCore | CreateProfileSetupCoreOptions = {}) {
  const core = isProfileSetupCore(source) ? source : createProfileSetupCore(source);

  function useProfileSetupSelector<T>(selector: (state: ReturnType<typeof core.getSnapshot>) => T): T {
    return useSyncExternalStore(core.subscribe, () => selector(core.getSnapshot()), () => selector(core.getSnapshot()));
  }

  return {
    getSnapshot: core.getSnapshot,
    actions: core.actions,
    useActiveStep: () => useProfileSetupSelector((state) => state.activeStep),
    useDraft: () => useProfileSetupSelector((state) => state.draft),
    useFieldErrors: () => useProfileSetupSelector((state) => state.fieldErrors),
    useIsSaving: () => useProfileSetupSelector((state) => state.status === 'saving'),
    useStatus: () => useProfileSetupSelector((state) => state.status),
    useError: () => useProfileSetupSelector((state) => state.error),
  };
}

export type ProfileSetupReactFacade = ReturnType<typeof createProfileSetupReactFacade>;
