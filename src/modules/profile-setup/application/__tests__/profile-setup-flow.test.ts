import { describe, expect, it } from 'vitest';
import { createProfileSetupFacade } from '../create-facade';

describe('profile setup application flow', () => {
  it('does not advance from personal info when semantic data is invalid', () => {
    const facade = createProfileSetupFacade();
    facade.actions.init();

    facade.actions.savePersonalInfo({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '2010-01-01',
      dni: '12345678A',
      email: 'ada@example.com',
    });

    facade.actions.next();

    expect(facade.getSnapshot().activeStep).toBe('personal-info');
    expect(facade.getSnapshot().fieldErrors).toMatchObject({
      birthDate: 'Debes tener al menos 18 años.',
      dni: 'El DNI no es válido.',
    });
  });

  it('advances through the three steps and marks the flow as submitted', async () => {
    const facade = createProfileSetupFacade({ saveDelayMs: 0, now: () => new Date('2026-05-15') });
    facade.actions.init();

    facade.actions.savePersonalInfo({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '1990-01-01',
      dni: '12345678Z',
      email: 'ada@example.com',
    });
    facade.actions.next();

    facade.actions.saveInterests({
      music: 'Jazz',
      sports: 'Natación',
      hobbies: 'Lectura',
      culturalInterests: 'Teatro',
      socialActivityLevel: 'medium',
    });
    facade.actions.next();

    facade.actions.savePreferences({
      appGoal: 'Conocer gente afín',
      communicationPreference: 'email',
      cityOrArea: 'Madrid centro',
      expectedUsageFrequency: 'weekly',
      acceptsTerms: true,
      acceptsPrivacy: true,
    });

    await facade.actions.submit();

    expect(facade.getSnapshot().status).toBe('success');
  });
});
