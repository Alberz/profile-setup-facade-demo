import { useState } from 'react';
import type { FieldErrors, Preferences } from '../../domain/models/profile-setup';
import { FieldError } from './field-error';

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
      className="step-card"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <h2>3. Preferencias y objetivos</h2>
      <label>
        Qué buscas en la app
        <textarea value={form.appGoal} onChange={(event) => setForm({ ...form, appGoal: event.target.value })} />
      </label>
      <FieldError id="appGoal-error" message={errors.appGoal} />

      <label>
        Preferencia de comunicación
        <select
          value={form.communicationPreference}
          onChange={(event) => setForm({ ...form, communicationPreference: event.target.value as Preferences['communicationPreference'] })}
        >
          <option value="">Selecciona una opción</option>
          <option value="email">Email</option>
          <option value="phone">Teléfono</option>
          <option value="none">Sin comunicaciones</option>
        </select>
      </label>
      <FieldError id="communicationPreference-error" message={errors.communicationPreference} />

      <label>
        Ciudad o zona
        <input value={form.cityOrArea} onChange={(event) => setForm({ ...form, cityOrArea: event.target.value })} />
      </label>
      <FieldError id="cityOrArea-error" message={errors.cityOrArea} />

      <label>
        Frecuencia esperada de uso
        <select
          value={form.expectedUsageFrequency}
          onChange={(event) => setForm({ ...form, expectedUsageFrequency: event.target.value as Preferences['expectedUsageFrequency'] })}
        >
          <option value="">Selecciona una opción</option>
          <option value="daily">Diaria</option>
          <option value="weekly">Semanal</option>
          <option value="monthly">Mensual</option>
        </select>
      </label>
      <FieldError id="expectedUsageFrequency-error" message={errors.expectedUsageFrequency} />

      <label className="checkbox-row">
        <input
          checked={form.acceptsTerms}
          type="checkbox"
          onChange={(event) => setForm({ ...form, acceptsTerms: event.target.checked })}
        />
        Acepto los términos del servicio
      </label>
      <FieldError id="acceptsTerms-error" message={errors.acceptsTerms} />

      <label className="checkbox-row">
        <input
          checked={form.acceptsPrivacy}
          type="checkbox"
          onChange={(event) => setForm({ ...form, acceptsPrivacy: event.target.checked })}
        />
        Acepto la política de privacidad
      </label>
      <FieldError id="acceptsPrivacy-error" message={errors.acceptsPrivacy} />

      <div className="actions between">
        <button disabled={isSaving} type="button" onClick={onBack}>Anterior</button>
        <button disabled={isSaving} type="submit">{isSaving ? 'Guardando...' : 'Guardar perfil'}</button>
      </div>
    </form>
  );
}
