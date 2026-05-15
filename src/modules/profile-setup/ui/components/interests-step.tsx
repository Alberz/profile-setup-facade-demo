import { useState } from 'react';
import type { FieldErrors, Interests } from '../../domain/models/profile-setup';
import { FieldError } from './field-error';

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
      className="step-card"
      onSubmit={(event) => {
        event.preventDefault();
        onNext(form);
      }}
    >
      <h2>2. Gustos, hobbies e intereses</h2>
      <label>
        Música
        <input value={form.music} onChange={(event) => setForm({ ...form, music: event.target.value })} />
      </label>
      <FieldError id="music-error" message={errors.music} />

      <label>
        Deportes
        <input value={form.sports} onChange={(event) => setForm({ ...form, sports: event.target.value })} />
      </label>
      <FieldError id="sports-error" message={errors.sports} />

      <label>
        Hobbies
        <input value={form.hobbies} onChange={(event) => setForm({ ...form, hobbies: event.target.value })} />
      </label>
      <FieldError id="hobbies-error" message={errors.hobbies} />

      <label>
        Intereses culturales
        <input value={form.culturalInterests} onChange={(event) => setForm({ ...form, culturalInterests: event.target.value })} />
      </label>
      <FieldError id="culturalInterests-error" message={errors.culturalInterests} />

      <label>
        Nivel de actividad social
        <select
          value={form.socialActivityLevel}
          onChange={(event) => setForm({ ...form, socialActivityLevel: event.target.value as Interests['socialActivityLevel'] })}
        >
          <option value="">Selecciona una opción</option>
          <option value="low">Bajo</option>
          <option value="medium">Medio</option>
          <option value="high">Alto</option>
        </select>
      </label>
      <FieldError id="socialActivityLevel-error" message={errors.socialActivityLevel} />

      <div className="actions between">
        <button type="button" onClick={onBack}>Anterior</button>
        <button type="submit">Siguiente</button>
      </div>
    </form>
  );
}
