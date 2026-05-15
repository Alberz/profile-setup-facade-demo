import type { ValidationResult } from '../models/profile-setup';

export function validateEmail(value: string): ValidationResult {
  const normalized = value.trim();

  if (!normalized) {
    return { valid: false, message: 'El email es obligatorio.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return { valid: false, message: 'El email no tiene un formato válido.' };
  }

  return { valid: true };
}
