import { ref } from 'vue';

export function useDniHelpModal() {
  const isOpen = ref(false);

  return {
    isOpen,
    open: () => {
      isOpen.value = true;
    },
    close: () => {
      isOpen.value = false;
    },
  };
}
