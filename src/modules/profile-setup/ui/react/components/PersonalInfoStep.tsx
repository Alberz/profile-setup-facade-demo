import { useState } from 'react';
import type { FieldErrors, PersonalInfo } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepForm.module.css';
import { useDniHelpModal } from '../hooks/useDniHelpModal';
import { DniHelpModal } from './DniHelpModal';
import { FormField } from './FormControls';
import { Icon } from './Icon';

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
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        onNext(form);
      }}
    >
      <header className={styles.heading}>
        <h2>Datos personales</h2>
        <p>Empezamos con la información mínima para crear tu perfil de forma segura.</p>
      </header>

      <div className={styles.grid}>
        <FormField
          error={errors.firstName}
          icon="user"
          id="firstName"
          label="Nombre"
          placeholder="Escribe tu nombre"
          value={form.firstName}
          onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
        />
        <FormField
          error={errors.lastName}
          icon="users"
          id="lastName"
          label="Apellidos"
          placeholder="Escribe tus apellidos"
          value={form.lastName}
          onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
        />
        <FormField
          error={errors.birthDate}
          icon="calendar"
          id="birthDate"
          label="Fecha de nacimiento"
          type="date"
          value={form.birthDate}
          onChange={(event) => setForm((current) => ({ ...current, birthDate: event.target.value }))}
        />
        <FormField
          action={
            <button className={styles.helpButton} type="button" onClick={dniHelpModal.open}>
              <Icon name="info" />
              Ayuda sobre el DNI
            </button>
          }
          error={errors.dni}
          icon="id-card"
          id="dni"
          label="DNI"
          placeholder="12345678Z"
          value={form.dni}
          onChange={(event) => setForm((current) => ({ ...current, dni: event.target.value }))}
        />
        <FormField
          error={errors.email}
          fullWidth
          icon="mail"
          id="email"
          label="Email"
          placeholder="ejemplo@correo.com"
          type="email"
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
        />
      </div>

      <div className={[styles.actions, styles.actionsEnd].join(' ')}>
        <button className={styles.primaryButton} type="submit">
          Siguiente
          <Icon className={styles.buttonIcon} name="arrow-right" />
        </button>
      </div>

      <DniHelpModal isOpen={dniHelpModal.isOpen} onClose={dniHelpModal.close} />
    </form>
  );
}
