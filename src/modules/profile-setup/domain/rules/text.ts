import type { ValidationResult } from '../models/profile-setup';

export function requireText(value: string, message: string): ValidationResult {
  return value.trim() ? { valid: true } : { valid: false, message };
}
