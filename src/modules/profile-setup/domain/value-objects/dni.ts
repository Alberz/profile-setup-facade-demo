import type { ValidationResult } from '../models/profile-setup';

const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

export function validateDni(value: string): ValidationResult {
  const normalized = value.trim().toUpperCase();
  const match = /^(\d{8})([A-Z])$/.exec(normalized);

  if (!match) {
    return { valid: false, message: 'El DNI debe tener 8 números y una letra.' };
  }

  const [, numberPart, letter] = match;
  const expectedLetter = DNI_LETTERS[Number(numberPart) % 23];

  if (letter !== expectedLetter) {
    return { valid: false, message: 'El DNI no es válido.' };
  }

  return { valid: true };
}
