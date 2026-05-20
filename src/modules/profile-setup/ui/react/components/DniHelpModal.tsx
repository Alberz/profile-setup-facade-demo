import styles from '../../shared/styles/DniHelpModal.module.css';
import { Icon } from './Icon';

type DniHelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DniHelpModal({ isOpen, onClose }: DniHelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <section aria-modal="true" aria-label="Ayuda sobre el DNI" className={styles.modal} role="dialog">
        <span className={styles.iconBadge}>
          <Icon name="id-card" />
        </span>
        <h2>Ayuda sobre el DNI</h2>
        <p>Introduce 8 números seguidos de la letra de control, por ejemplo 12345678Z.</p>
        <p>La letra no es decorativa: se calcula a partir del número. ESO es una regla de dominio.</p>
        <button className={styles.closeButton} type="button" onClick={onClose}>
          Cerrar
          <Icon name="x" />
        </button>
      </section>
    </div>
  );
}
