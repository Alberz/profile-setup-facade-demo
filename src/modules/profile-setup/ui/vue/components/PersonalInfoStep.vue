<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';
import type { FieldErrors, PersonalInfo } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepForm.module.css';
import { useDniHelpModal } from '../hooks/useDniHelpModal';
import DniHelpModal from './DniHelpModal.vue';
import FormField from './FormField.vue';
import Icon from './Icon.vue';

const props = defineProps<{
  value: PersonalInfo;
  errors: FieldErrors;
}>();

const emit = defineEmits<{
  next: [value: PersonalInfo];
}>();

const form = reactive(structuredClone(props.value));
const dniHelpModal = useDniHelpModal();

watch(
  () => props.value,
  (value) => {
    Object.assign(form, structuredClone(value));
  },
  { deep: true },
);

function submit() {
  emit('next', structuredClone(toRaw(form)));
}
</script>

<template>
  <form
    :class="styles.form"
    @submit.prevent="submit"
  >
    <header :class="styles.heading">
      <h2>Datos personales</h2>
      <p>Empezamos con la información mínima para crear tu perfil de forma segura.</p>
    </header>

    <div :class="styles.grid">
      <FormField id="firstName" v-model="form.firstName" icon="user" label="Nombre" placeholder="Escribe tu nombre" :error="props.errors.firstName" />
      <FormField id="lastName" v-model="form.lastName" icon="users" label="Apellidos" placeholder="Escribe tus apellidos" :error="props.errors.lastName" />
      <FormField id="birthDate" v-model="form.birthDate" icon="calendar" label="Fecha de nacimiento" type="date" :error="props.errors.birthDate" />
      <FormField id="dni" v-model="form.dni" icon="id-card" label="DNI" placeholder="12345678Z" :error="props.errors.dni">
        <template #action>
          <button :class="styles.helpButton" type="button" @click="dniHelpModal.open">
            <Icon name="info" />
            Ayuda sobre el DNI
          </button>
        </template>
      </FormField>
      <FormField id="email" v-model="form.email" full-width icon="mail" label="Email" placeholder="ejemplo@correo.com" type="email" :error="props.errors.email" />
    </div>

    <div :class="[styles.actions, styles.actionsEnd]">
      <button :class="styles.primaryButton" type="submit">
        Siguiente
        <Icon :class-name="styles.buttonIcon" name="arrow-right" />
      </button>
    </div>

    <DniHelpModal :is-open="dniHelpModal.isOpen.value" @close="dniHelpModal.close" />
  </form>
</template>
