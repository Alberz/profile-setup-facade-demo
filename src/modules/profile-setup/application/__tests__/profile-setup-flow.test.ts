import { effectScope } from 'vue';
import { describe, expect, it } from 'vitest';
import { createProfileSetupCore } from '../create-profile-setup-core';
import { createProfileSetupReactFacade } from '../create-react-facade';
import { createProfileSetupVueFacade } from '../create-vue-facade';

describe('profile setup application flow', () => {
  it('does not advance from personal info when semantic data is invalid', () => {
    const core = createProfileSetupCore();
    core.actions.init();

    core.actions.savePersonalInfo({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '2010-01-01',
      dni: '12345678A',
      email: 'ada@example.com',
    });

    core.actions.next();

    expect(core.getSnapshot().activeStep).toBe('personal-info');
    expect(core.getSnapshot().fieldErrors).toMatchObject({
      birthDate: 'Debes tener al menos 18 años.',
      dni: 'El DNI no es válido.',
    });
  });

  it('uses injected saveProfile to persist the draft before marking success', async () => {
    const savedDrafts: unknown[] = [];
    const core = createProfileSetupCore({
      now: () => new Date('2026-05-15'),
      saveProfile: async (draft) => {
        savedDrafts.push(draft);
      },
    });
    core.actions.init();

    core.actions.savePersonalInfo({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '1990-01-01',
      dni: '12345678Z',
      email: 'ada@example.com',
    });
    core.actions.next();

    core.actions.saveInterests({
      music: 'Jazz',
      sports: 'Natación',
      hobbies: 'Lectura',
      culturalInterests: 'Teatro',
      socialActivityLevel: 'medium',
    });
    core.actions.next();

    core.actions.savePreferences({
      appGoal: 'Conocer gente afín',
      communicationPreference: 'email',
      cityOrArea: 'Madrid centro',
      expectedUsageFrequency: 'weekly',
      acceptsTerms: true,
      acceptsPrivacy: true,
    });

    await core.actions.submit();

    expect(savedDrafts).toEqual([core.getSnapshot().draft]);
    expect(core.getSnapshot().status).toBe('success');
  });

  it('keeps React and Vue adapters aligned when they share the same core', () => {
    const core = createProfileSetupCore({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    const reactFacade = createProfileSetupReactFacade(core);
    const vueFacade = createProfileSetupVueFacade(core);

    const scope = effectScope();
    scope.run(() => {
      const activeStep = vueFacade.useActiveStep();
      reactFacade.actions.fillWithValidSampleData();
      reactFacade.actions.next();

      expect(reactFacade.getSnapshot().draft.personalInfo.firstName).toBe('Ada');
      expect(activeStep.value).toBe('interests');
    });
    scope.stop();
  });

  it('advances through the three steps and marks the flow as submitted', async () => {
    const core = createProfileSetupCore({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    core.actions.init();

    core.actions.savePersonalInfo({
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthDate: '1990-01-01',
      dni: '12345678Z',
      email: 'ada@example.com',
    });
    core.actions.next();

    core.actions.saveInterests({
      music: 'Jazz',
      sports: 'Natación',
      hobbies: 'Lectura',
      culturalInterests: 'Teatro',
      socialActivityLevel: 'medium',
    });
    core.actions.next();

    core.actions.savePreferences({
      appGoal: 'Conocer gente afín',
      communicationPreference: 'email',
      cityOrArea: 'Madrid centro',
      expectedUsageFrequency: 'weekly',
      acceptsTerms: true,
      acceptsPrivacy: true,
    });

    await core.actions.submit();

    expect(core.getSnapshot().status).toBe('success');
  });
});
