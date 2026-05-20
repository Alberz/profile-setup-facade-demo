import { useCallback, useState } from 'react';

export function useDniHelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
  };
}
