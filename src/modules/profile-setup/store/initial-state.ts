import type { ProfileSetupState } from './create-store';

export const initialProfileSetupState: ProfileSetupState = {
  activeStep: 'personal-info',
  status: 'idle',
  fieldErrors: {},
  error: null,
  draft: {
    personalInfo: {
      firstName: '',
      lastName: '',
      birthDate: '',
      dni: '',
      email: '',
    },
    interests: {
      music: '',
      sports: '',
      hobbies: '',
      culturalInterests: '',
      socialActivityLevel: '',
    },
    preferences: {
      appGoal: '',
      communicationPreference: '',
      cityOrArea: '',
      expectedUsageFrequency: '',
      acceptsTerms: false,
      acceptsPrivacy: false,
    },
  },
};
