import type { ProfileSetupFacade } from '../../application/create-facade';
import { Icon } from '../components/Icon';
import { InterestsStep } from '../components/InterestsStep';
import { PersonalInfoStep } from '../components/PersonalInfoStep';
import { PreferencesStep } from '../components/PreferencesStep';
import { StepIndicator } from '../components/StepIndicator';
import styles from './ProfileSetupScreen.module.css';

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
      <main className={styles.shell}>
        <section className={styles.successCard}>
          <span className={styles.successIcon}>
            <Icon name="check" />
          </span>
          <h1>Perfil guardado correctamente.</h1>
          <p>La UI solo conoce la fachada. El flujo y las reglas viven fuera de React.</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>Configura tu perfil</h1>
            <p>Completa el onboarding y observa cómo React renderiza mientras la arquitectura hace el trabajo serio.</p>
          </div>
          <button className={styles.demoButton} type="button" onClick={facade.actions.fillWithValidSampleData}>
            <Icon name="sparkles" />
            Rellenar demo
          </button>
        </header>

        <StepIndicator activeStep={activeStep} />

        {activeStep === 'personal-info' && (
          <PersonalInfoStep
            key={JSON.stringify(draft.personalInfo)}
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
            key={JSON.stringify(draft.interests)}
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
            key={JSON.stringify(draft.preferences)}
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
      </section>
    </main>
  );
}
