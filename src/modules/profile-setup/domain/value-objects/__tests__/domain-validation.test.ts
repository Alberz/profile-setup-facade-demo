import { describe, expect, it } from 'vitest';
import { validateBirthDate } from '../birth-date';
import { validateDni } from '../dni';
import { validateEmail } from '../email';

describe('profile setup domain validations', () => {
  it('accepts a DNI with a valid control letter', () => {
    expect(validateDni('12345678Z')).toEqual({ valid: true });
  });

  it('rejects a DNI with an invalid control letter', () => {
    expect(validateDni('12345678A')).toEqual({ valid: false, message: 'El DNI no es válido.' });
  });

  it('rejects malformed email addresses', () => {
    expect(validateEmail('persona@sin-dominio')).toEqual({ valid: false, message: 'El email no tiene un formato válido.' });
  });

  it('rejects birth dates below the minimum age', () => {
    expect(validateBirthDate('2012-01-01', new Date('2026-05-15'))).toEqual({
      valid: false,
      message: 'Debes tener al menos 18 años.',
    });
  });
});
