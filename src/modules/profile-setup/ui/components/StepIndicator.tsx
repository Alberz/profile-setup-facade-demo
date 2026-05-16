import type { StepId } from '../../domain/models/profile-setup';
import styles from './StepIndicator.module.css';

type StepIndicatorProps = {
  activeStep: StepId;
};

const steps: Array<{ id: StepId; label: string }> = [
  { id: 'personal-info', label: 'Tus datos' },
  { id: 'interests', label: 'Tus intereses' },
  { id: 'preferences', label: 'Confirmación' },
];

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  const activeIndex = steps.findIndex((step) => step.id === activeStep);
  const progressClass = activeIndex === 0 ? styles.progressStart : activeIndex === 1 ? styles.progressMiddle : styles.progressEnd;

  return (
    <ol className={styles.stepper} aria-label="Progreso del onboarding">
      <span aria-hidden="true" className={[styles.progress, progressClass].join(' ')} />
      {steps.map((step, index) => {
        const stateClass = index < activeIndex ? styles.complete : index === activeIndex ? styles.active : '';

        return (
          <li key={step.id} aria-current={step.id === activeStep ? 'step' : undefined} className={[styles.step, stateClass].filter(Boolean).join(' ')}>
            <span className={styles.circle}>{index + 1}</span>
            {step.label}
          </li>
        );
      })}
    </ol>
  );
}
