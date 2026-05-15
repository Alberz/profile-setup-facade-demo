type DniHelpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DniHelpModal({ isOpen, onClose }: DniHelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <section aria-modal="true" aria-label="Ayuda sobre el DNI" className="modal" role="dialog">
        <h2>Ayuda sobre el DNI</h2>
        <p>Introduce 8 números seguidos de la letra de control, por ejemplo 12345678Z.</p>
        <p>La letra no es decorativa: se calcula a partir del número. ESO es una regla de dominio.</p>
        <button type="button" onClick={onClose}>
          Cerrar
        </button>
      </section>
    </div>
  );
}
