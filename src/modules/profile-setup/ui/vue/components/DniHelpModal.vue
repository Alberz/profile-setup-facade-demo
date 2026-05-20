<script setup lang="ts">
import styles from '../../shared/styles/DniHelpModal.module.css';
import Icon from './Icon.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <div v-if="props.isOpen" :class="styles.backdrop">
    <section aria-label="Ayuda sobre el DNI" aria-modal="true" :class="styles.modal" role="dialog">
      <span :class="styles.iconBadge">
        <Icon name="id-card" />
      </span>
      <h2>Ayuda sobre el DNI</h2>
      <p>Introduce 8 números seguidos de la letra de control, por ejemplo 12345678Z.</p>
      <p>La letra no es decorativa: se calcula a partir del número. ESO es una regla de dominio.</p>
      <button :class="styles.closeButton" type="button" @click="emit('close')">
        Cerrar
        <Icon name="x" />
      </button>
    </section>
  </div>
</template>
