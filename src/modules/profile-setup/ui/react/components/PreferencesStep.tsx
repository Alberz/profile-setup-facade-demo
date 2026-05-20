import { useState } from 'react';
import type { FieldErrors, Preferences } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepForm.module.css';
import { CheckboxField, FormField, SelectField, TextAreaField } from './FormControls';
import { Icon } from './Icon';

type PreferencesStepProps = {
  value: Preferences;
  errors: FieldErrors;
  isSaving: boolean;
  onBack: () => void;
  onSubmit: (value: Preferences) => void;
};

export function PreferencesStep({ value, errors, isSaving, onBack, onSubmit }: PreferencesStepProps) {
  const [form, setForm] = useState(value);

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <header className={styles.heading}>
        <h2>Preferencias y objetivos</h2>
        <p>Último paso: definimos expectativas y consentimientos antes de guardar el perfil.</p>
      </header>

      <div className={styles.grid}>
        <TextAreaField error={errors.appGoal} icon="target" id="appGoal" label="Qué buscas en la app" placeholder="Cuéntanos brevemente tu objetivo..." value={form.appGoal} onChange={(event) => setForm((current) => ({ ...current, appGoal: event.target.value }))} />
        <SelectField
          error={errors.communicationPreference}
          icon="send"
          id="communicationPreference"
          label="Preferencia de comunicación"
          options={[
            { label: 'Selecciona una opción', value: '' },
            { label: 'Email', value: 'email' },
            { label: 'Teléfono', value: 'phone' },
            { label: 'Sin comunicaciones', value: 'none' },
          ]}
          value={form.communicationPreference}
          onChange={(event) => setForm((current) => ({ ...current, communicationPreference: event.target.value as Preferences['communicationPreference'] }))}
        />
        <FormField error={errors.cityOrArea} icon="map-pin" id="cityOrArea" label="Ciudad o zona" placeholder="Madrid centro" value={form.cityOrArea} onChange={(event) => setForm((current) => ({ ...current, cityOrArea: event.target.value }))} />
        <SelectField
          error={errors.expectedUsageFrequency}
          icon="repeat"
          id="expectedUsageFrequency"
          label="Frecuencia esperada de uso"
          options={[
            { label: 'Selecciona una opción', value: '' },
            { label: 'Diaria', value: 'daily' },
            { label: 'Semanal', value: 'weekly' },
            { label: 'Mensual', value: 'monthly' },
          ]}
          value={form.expectedUsageFrequency}
          onChange={(event) => setForm((current) => ({ ...current, expectedUsageFrequency: event.target.value as Preferences['expectedUsageFrequency'] }))}
        />
        <CheckboxField checked={form.acceptsTerms} error={errors.acceptsTerms} id="acceptsTerms" label="Acepto los términos del servicio" onChange={(acceptsTerms) => setForm((current) => ({ ...current, acceptsTerms }))} />
        <CheckboxField checked={form.acceptsPrivacy} error={errors.acceptsPrivacy} id="acceptsPrivacy" label="Acepto la política de privacidad" onChange={(acceptsPrivacy) => setForm((current) => ({ ...current, acceptsPrivacy }))} />
      </div>

      <div className={styles.actions}>
        <button className={styles.secondaryButton} disabled={isSaving} type="button" onClick={onBack}>
          <Icon className={styles.buttonIcon} name="arrow-left" />
          Anterior
        </button>
        <button className={styles.primaryButton} disabled={isSaving} type="submit">
          {isSaving ? 'Guardando...' : 'Guardar perfil'}
          <Icon className={styles.buttonIcon} name="arrow-right" />
        </button>
      </div>
    </form>
  );
}
