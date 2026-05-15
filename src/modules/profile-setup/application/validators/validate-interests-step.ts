import type { FieldErrors, Interests } from '../../domain/models/profile-setup';

export function validateInterestsStep(interests: Interests): FieldErrors {
  const errors: FieldErrors = {};

  if (!interests.music.trim()) errors.music = 'Indica algún gusto musical.';
  if (!interests.sports.trim()) errors.sports = 'Indica algún deporte o actividad física.';
  if (!interests.hobbies.trim()) errors.hobbies = 'Indica al menos un hobby.';
  if (!interests.culturalInterests.trim()) errors.culturalInterests = 'Indica algún interés cultural.';
  if (!interests.socialActivityLevel) errors.socialActivityLevel = 'Selecciona tu nivel de actividad social.';

  return errors;
}
