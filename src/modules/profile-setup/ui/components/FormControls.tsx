import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';
import styles from './FormControls.module.css';

type BaseFieldProps = {
  id: string;
  label: string;
  error?: string;
  icon: IconName;
  fullWidth?: boolean;
  action?: React.ReactNode;
};

type FormFieldProps = BaseFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>;

type TextAreaFieldProps = BaseFieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>;

type SelectFieldProps = BaseFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
    options: Array<{ label: string; value: string }>;
  };

type CheckboxFieldProps = {
  id: string;
  label: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
};

export function FormField({ id, label, error, icon, fullWidth = false, action, ...inputProps }: FormFieldProps) {
  return (
    <div className={[styles.field, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        {action}
      </div>
      <div className={[styles.controlShell, error ? styles.hasError : ''].filter(Boolean).join(' ')}>
        <Icon className={styles.icon} name={icon} />
        <input aria-describedby={error ? `${id}-error` : undefined} className={styles.input} id={id} {...inputProps} />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function TextAreaField({ id, label, error, icon, fullWidth = true, action, ...textareaProps }: TextAreaFieldProps) {
  return (
    <div className={[styles.field, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        {action}
      </div>
      <div className={[styles.controlShell, styles.textareaShell, error ? styles.hasError : ''].filter(Boolean).join(' ')}>
        <Icon className={styles.icon} name={icon} />
        <textarea aria-describedby={error ? `${id}-error` : undefined} className={styles.textarea} id={id} {...textareaProps} />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function SelectField({ id, label, error, icon, options, fullWidth = false, action, ...selectProps }: SelectFieldProps) {
  return (
    <div className={[styles.field, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        {action}
      </div>
      <div className={[styles.controlShell, error ? styles.hasError : ''].filter(Boolean).join(' ')}>
        <Icon className={styles.icon} name={icon} />
        <select aria-describedby={error ? `${id}-error` : undefined} className={styles.select} id={id} {...selectProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function CheckboxField({ id, label, checked, error, onChange }: CheckboxFieldProps) {
  return (
    <div className={styles.fullWidth}>
      <label className={[styles.checkboxField, error ? styles.hasError : ''].filter(Boolean).join(' ')} htmlFor={id}>
        <input checked={checked} id={id} type="checkbox" onChange={(event) => onChange(event.target.checked)} />
        <span className={styles.checkboxLabel}>{label}</span>
      </label>
      <FieldError className={styles.checkboxError} id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message, className }: { id: string; message?: string; className?: string }) {
  if (!message) return null;

  return <p className={[styles.error, className].filter(Boolean).join(' ')} id={id} role="alert">{message}</p>;
}
