import { useState } from 'react';
import type { FieldErrors, Interests } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepForm.module.css';
import { FormField, SelectField } from './FormControls';
import { Icon } from './Icon';

type InterestsStepProps = {
  value: Interests;
  errors: FieldErrors;
  onBack: () => void;
  onNext: (value: Interests) => void;
};

export function InterestsStep({ value, errors, onBack, onNext }: InterestsStepProps) {
  const [form, setForm] = useState(value);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onNext(form);
      }}
    >
      <header className={styles.heading}>
        <h2>Gustos e intereses</h2>
        <p>Estos datos ayudan a explicar el flujo de validación sin meter reglas en los componentes.</p>
      </header>

      <div className={styles.grid}>
        <FormField error={errors.music} icon="music" id="music" label="Música" placeholder="Jazz, indie, clásica..." value={form.music} onChange={(event) => setForm((current) => ({ ...current, music: event.target.value }))} />
        <FormField error={errors.sports} icon="activity" id="sports" label="Deportes" placeholder="Natación, running..." value={form.sports} onChange={(event) => setForm((current) => ({ ...current, sports: event.target.value }))} />
        <FormField error={errors.hobbies} icon="sparkles" id="hobbies" label="Hobbies" placeholder="Lectura, cocina..." value={form.hobbies} onChange={(event) => setForm((current) => ({ ...current, hobbies: event.target.value }))} />
        <FormField error={errors.culturalInterests} icon="message" id="culturalInterests" label="Intereses culturales" placeholder="Teatro, museos..." value={form.culturalInterests} onChange={(event) => setForm((current) => ({ ...current, culturalInterests: event.target.value }))} />
        <SelectField
          error={errors.socialActivityLevel}
          fullWidth
          icon="users"
          id="socialActivityLevel"
          label="Nivel de actividad social"
          options={[
            { label: 'Selecciona una opción', value: '' },
            { label: 'Bajo', value: 'low' },
            { label: 'Medio', value: 'medium' },
            { label: 'Alto', value: 'high' },
          ]}
          value={form.socialActivityLevel}
          onChange={(event) => setForm((current) => ({ ...current, socialActivityLevel: event.target.value as Interests['socialActivityLevel'] }))}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.secondaryButton} type="button" onClick={onBack}>
          <Icon className={styles.buttonIcon} name="arrow-left" />
          Anterior
        </button>
        <button className={styles.primaryButton} type="submit">
          Siguiente
          <Icon className={styles.buttonIcon} name="arrow-right" />
        </button>
      </div>
    </form>
  );
}
