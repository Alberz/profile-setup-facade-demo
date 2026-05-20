import { computed, getCurrentScope, onScopeDispose, shallowRef } from 'vue';
import type { CreateProfileSetupCoreOptions, ProfileSetupCore } from './create-profile-setup-core';
import { createProfileSetupCore } from './create-profile-setup-core';

function isProfileSetupCore(value: ProfileSetupCore | CreateProfileSetupCoreOptions): value is ProfileSetupCore {
  return 'subscribe' in value && 'actions' in value;
}

export function createProfileSetupVueFacade(source: ProfileSetupCore | CreateProfileSetupCoreOptions = {}) {
  const core = isProfileSetupCore(source) ? source : createProfileSetupCore(source);

  function useProfileSetupSelector<T>(selector: (state: ReturnType<typeof core.getSnapshot>) => T) {
    const selected = shallowRef(selector(core.getSnapshot()));
    const unsubscribe = core.subscribe(() => {
      selected.value = selector(core.getSnapshot());
    });

    if (getCurrentScope()) {
      onScopeDispose(unsubscribe);
    }

    return computed(() => selected.value);
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

export type ProfileSetupVueFacade = ReturnType<typeof createProfileSetupVueFacade>;
