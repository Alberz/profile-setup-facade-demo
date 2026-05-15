import { useState } from 'react';
import type { FieldErrors, PersonalInfo } from '../../domain/models/profile-setup';
import { DniHelpModal } from './dni-help-modal';
import { FieldError } from './field-error';
import { useDniHelpModal } from '../hooks/use-dni-help-modal';

type PersonalInfoStepProps = {
  value: PersonalInfo;
  errors: FieldErrors;
  onNext: (value: PersonalInfo) => void;
};

export function PersonalInfoStep({ value, errors, onNext }: PersonalInfoStepProps) {
  const [form, setForm] = useState(value);
  const dniHelpModal = useDniHelpModal();

  return (
    <form
      className="step-card"
      onSubmit={(event) => {
        event.preventDefault();
        onNext(form);
      }}
    >
      <h2>1. Datos personales</h2>
      <label>
        Nombre
        <input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
      </label>
      <FieldError id="firstName-error" message={errors.firstName} />

      <label>
        Apellidos
        <input value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
      </label>
      <FieldError id="lastName-error" message={errors.lastName} />

      <label>
        Fecha de nacimiento
        <input type="date" value={form.birthDate} onChange={(event) => setForm({ ...form, birthDate: event.target.value })} />
      </label>
      <FieldError id="birthDate-error" message={errors.birthDate} />

      <div className="inline-field-heading">
        <label htmlFor="dni">DNI</label>
        <button className="link-button" type="button" onClick={dniHelpModal.open}>
          Ayuda sobre el DNI
        </button>
      </div>
      <input id="dni" value={form.dni} onChange={(event) => setForm({ ...form, dni: event.target.value })} />
      <FieldError id="dni-error" message={errors.dni} />

      <label>
        Email
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
      </label>
      <FieldError id="email-error" message={errors.email} />

      <div className="actions right">
        <button type="submit">Siguiente</button>
      </div>

      <DniHelpModal isOpen={dniHelpModal.isOpen} onClose={dniHelpModal.close} />
    </form>
  );
}
