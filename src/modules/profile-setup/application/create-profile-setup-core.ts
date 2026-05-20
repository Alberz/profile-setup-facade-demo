import type { Interests, PersonalInfo, Preferences, ProfileSetupDraft, StepId } from '../domain/models/profile-setup';
import { createProfileSetupStore } from '../store/create-store';
import { validateInterestsStep } from './validators/validate-interests-step';
import { validatePersonalInfoStep } from './validators/validate-personal-info-step';
import { validatePreferencesStep } from './validators/validate-preferences-step';
import { validSampleProfileSetupDraft } from './sample-profile-setup-draft';
import { silentTrigger, type Trigger } from './trigger';

const orderedSteps: StepId[] = ['personal-info', 'interests', 'preferences'];

export type SaveProfile = (draft: ProfileSetupDraft) => Promise<void>;

export type CreateProfileSetupCoreOptions = {
  saveDelayMs?: number;
  saveProfile?: SaveProfile;
  now?: () => Date;
  trigger?: Trigger;
};

export function createProfileSetupCore(options: CreateProfileSetupCoreOptions = {}) {
  const store = createProfileSetupStore();
  const saveDelayMs = options.saveDelayMs ?? 500;
  const now = options.now ?? (() => new Date());
  const trigger = options.trigger ?? silentTrigger;
  const saveProfile =
    options.saveProfile ??
    (async () => {
      await delay(saveDelayMs);
    });

  return {
    getSnapshot: store.getSnapshot,
    subscribe: store.subscribe,
    actions: {
      init() {
        trigger('initialized');
      },
      savePersonalInfo(personalInfo: PersonalInfo) {
        trigger('personal-info-saved');
        store.setState((state) => ({
          ...state,
          draft: { ...state.draft, personalInfo },
          fieldErrors: {},
          error: null,
        }));
      },
      saveInterests(interests: Interests) {
        trigger('interests-saved');
        store.setState((state) => ({
          ...state,
          draft: { ...state.draft, interests },
          fieldErrors: {},
          error: null,
        }));
      },
      savePreferences(preferences: Preferences) {
        trigger('preferences-saved');
        store.setState((state) => ({
          ...state,
          draft: { ...state.draft, preferences },
          fieldErrors: {},
          error: null,
        }));
      },
      fillWithValidSampleData() {
        trigger('demo-data-filled');
        store.setState((state) => ({
          ...state,
          draft: structuredClone(validSampleProfileSetupDraft),
          fieldErrors: {},
          error: null,
        }));
      },
      next() {
        trigger('next-requested');
        const state = store.getSnapshot();
        const fieldErrors = validateCurrentStep(state.activeStep, state.draft, now());

        if (Object.keys(fieldErrors).length > 0) {
          store.setState((current) => ({ ...current, fieldErrors }));
          return;
        }

        store.setState((current) => ({
          ...current,
          activeStep: getNextStep(current.activeStep),
          fieldErrors: {},
          error: null,
        }));
      },
      prev() {
        trigger('previous-requested');
        store.setState((state) => ({
          ...state,
          activeStep: getPreviousStep(state.activeStep),
          fieldErrors: {},
          error: null,
        }));
      },
      async submit() {
        trigger('submit-requested');
        const state = store.getSnapshot();
        const fieldErrors = validatePreferencesStep(state.draft.preferences);

        if (Object.keys(fieldErrors).length > 0) {
          store.setState((current) => ({ ...current, fieldErrors }));
          return;
        }

        store.setState((current) => ({ ...current, status: 'saving', error: null }));
        await saveProfile(state.draft);
        store.setState((current) => ({ ...current, status: 'success' }));
      },
    },
  };
}

function validateCurrentStep(activeStep: StepId, draft: ProfileSetupDraft, now: Date) {
  if (activeStep === 'personal-info') return validatePersonalInfoStep(draft.personalInfo, now);
  if (activeStep === 'interests') return validateInterestsStep(draft.interests);
  return validatePreferencesStep(draft.preferences);
}

function getNextStep(activeStep: StepId): StepId {
  const index = orderedSteps.indexOf(activeStep);
  return orderedSteps[Math.min(index + 1, orderedSteps.length - 1)];
}

function getPreviousStep(activeStep: StepId): StepId {
  const index = orderedSteps.indexOf(activeStep);
  return orderedSteps[Math.max(index - 1, 0)];
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds));
}

export type ProfileSetupCore = ReturnType<typeof createProfileSetupCore>;
