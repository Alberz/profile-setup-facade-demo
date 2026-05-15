import type { ProfileSetupFacade } from '../../application/create-facade';
import { InterestsStep } from '../components/interests-step';
import { PersonalInfoStep } from '../components/personal-info-step';
import { PreferencesStep } from '../components/preferences-step';

type ProfileSetupScreenProps = {
  facade: ProfileSetupFacade;
};

export function ProfileSetupScreen({ facade }: ProfileSetupScreenProps) {
  const activeStep = facade.useActiveStep();
  const draft = facade.useDraft();
  const fieldErrors = facade.useFieldErrors();
  const isSaving = facade.useIsSaving();
  const status = facade.useStatus();

  if (status === 'success') {
    return (
      <main className="page-shell">
        <section className="success-card">
          <p className="eyebrow">Onboarding completado</p>
          <h1>Perfil guardado correctamente.</h1>
          <p>La UI solo conoce la fachada. El flujo y las reglas viven fuera de React.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">Profile Setup Facade Demo</p>
        <h1>Onboarding de perfil en 3 pasos</h1>
        <p>Una mini app para estudiar React como capa de presentación, no como cajón desastre de lógica.</p>
      </header>

      <StepIndicator activeStep={activeStep} />

      {activeStep === 'personal-info' && (
        <PersonalInfoStep
          errors={fieldErrors}
          value={draft.personalInfo}
          onNext={(personalInfo) => {
            facade.actions.savePersonalInfo(personalInfo);
            facade.actions.next();
          }}
        />
      )}

      {activeStep === 'interests' && (
        <InterestsStep
          errors={fieldErrors}
          value={draft.interests}
          onBack={facade.actions.prev}
          onNext={(interests) => {
            facade.actions.saveInterests(interests);
            facade.actions.next();
          }}
        />
      )}

      {activeStep === 'preferences' && (
        <PreferencesStep
          errors={fieldErrors}
          isSaving={isSaving}
          value={draft.preferences}
          onBack={facade.actions.prev}
          onSubmit={(preferences) => {
            facade.actions.savePreferences(preferences);
            void facade.actions.submit();
          }}
        />
      )}
    </main>
  );
}

type StepIndicatorProps = {
  activeStep: string;
};

function StepIndicator({ activeStep }: StepIndicatorProps) {
  const steps = [
    ['personal-info', 'Datos personales'],
    ['interests', 'Intereses'],
    ['preferences', 'Preferencias'],
  ];

  return (
    <ol className="step-indicator" aria-label="Progreso del onboarding">
      {steps.map(([id, label], index) => (
        <li key={id} className={id === activeStep ? 'active' : ''}>
          <span>{index + 1}</span>
          {label}
        </li>
      ))}
    </ol>
  );
}
