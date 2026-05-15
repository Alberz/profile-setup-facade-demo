import type { FieldErrors, Preferences } from '../../domain/models/profile-setup';

export function validatePreferencesStep(preferences: Preferences): FieldErrors {
  const errors: FieldErrors = {};

  if (!preferences.appGoal.trim()) errors.appGoal = 'Explica qué buscas en la app.';
  if (!preferences.communicationPreference) errors.communicationPreference = 'Selecciona una preferencia de comunicación.';
  if (!preferences.cityOrArea.trim()) errors.cityOrArea = 'Indica tu ciudad o zona.';
  if (!preferences.expectedUsageFrequency) errors.expectedUsageFrequency = 'Selecciona la frecuencia esperada de uso.';
  if (!preferences.acceptsTerms) errors.acceptsTerms = 'Debes aceptar los términos.';
  if (!preferences.acceptsPrivacy) errors.acceptsPrivacy = 'Debes aceptar la política de privacidad.';

  return errors;
}
