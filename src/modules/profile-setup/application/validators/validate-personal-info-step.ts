import type { FieldErrors, PersonalInfo } from '../../domain/models/profile-setup';
import { requireText } from '../../domain/rules/text';
import { validateBirthDate } from '../../domain/value-objects/birth-date';
import { validateDni } from '../../domain/value-objects/dni';
import { validateEmail } from '../../domain/value-objects/email';

export function validatePersonalInfoStep(personalInfo: PersonalInfo, now = new Date()): FieldErrors {
  const errors: FieldErrors = {};

  addError(errors, 'firstName', requireText(personalInfo.firstName, 'El nombre es obligatorio.'));
  addError(errors, 'lastName', requireText(personalInfo.lastName, 'Los apellidos son obligatorios.'));
  addError(errors, 'birthDate', validateBirthDate(personalInfo.birthDate, now));
  addError(errors, 'dni', validateDni(personalInfo.dni));
  addError(errors, 'email', validateEmail(personalInfo.email));

  return errors;
}

function addError(errors: FieldErrors, field: keyof FieldErrors, result: { valid: true } | { valid: false; message: string }) {
  if (!result.valid) {
    errors[field] = result.message;
  }
}
