import type { ValidationResult } from '../models/profile-setup';

const MINIMUM_AGE = 18;

export function validateBirthDate(value: string, now = new Date()): ValidationResult {
  if (!value) {
    return { valid: false, message: 'La fecha de nacimiento es obligatoria.' };
  }

  const birthDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) {
    return { valid: false, message: 'La fecha de nacimiento no es válida.' };
  }

  if (birthDate > now) {
    return { valid: false, message: 'La fecha de nacimiento no puede ser futura.' };
  }

  if (calculateAge(birthDate, now) < MINIMUM_AGE) {
    return { valid: false, message: 'Debes tener al menos 18 años.' };
  }

  return { valid: true };
}

function calculateAge(birthDate: Date, now: Date): number {
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDelta = now.getMonth() - birthDate.getMonth();
  const hasNotHadBirthdayThisYear = monthDelta < 0 || (monthDelta === 0 && now.getDate() < birthDate.getDate());

  if (hasNotHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}
