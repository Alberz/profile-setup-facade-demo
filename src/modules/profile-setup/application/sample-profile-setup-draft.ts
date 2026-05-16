import type { ProfileSetupDraft } from '../domain/models/profile-setup';

export const validSampleProfileSetupDraft: ProfileSetupDraft = {
  personalInfo: {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthDate: '1990-01-01',
    dni: '12345678Z',
    email: 'ada@example.com',
  },
  interests: {
    music: 'Jazz',
    sports: 'Natación',
    hobbies: 'Lectura',
    culturalInterests: 'Teatro',
    socialActivityLevel: 'medium',
  },
  preferences: {
    appGoal: 'Conocer gente afín',
    communicationPreference: 'email',
    cityOrArea: 'Madrid centro',
    expectedUsageFrequency: 'weekly',
    acceptsTerms: true,
    acceptsPrivacy: true,
  },
};
