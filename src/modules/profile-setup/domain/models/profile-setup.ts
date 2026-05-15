export type StepId = 'personal-info' | 'interests' | 'preferences';

export type SocialActivityLevel = '' | 'low' | 'medium' | 'high';
export type CommunicationPreference = '' | 'email' | 'phone' | 'none';
export type ExpectedUsageFrequency = '' | 'daily' | 'weekly' | 'monthly';

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  birthDate: string;
  dni: string;
  email: string;
};

export type Interests = {
  music: string;
  sports: string;
  hobbies: string;
  culturalInterests: string;
  socialActivityLevel: SocialActivityLevel;
};

export type Preferences = {
  appGoal: string;
  communicationPreference: CommunicationPreference;
  cityOrArea: string;
  expectedUsageFrequency: ExpectedUsageFrequency;
  acceptsTerms: boolean;
  acceptsPrivacy: boolean;
};

export type ProfileSetupDraft = {
  personalInfo: PersonalInfo;
  interests: Interests;
  preferences: Preferences;
};

export type FieldErrors = Partial<Record<keyof PersonalInfo | keyof Interests | keyof Preferences, string>>;

export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string };
