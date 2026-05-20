<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';
import type { FieldErrors, Interests } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepForm.module.css';
import FormField from './FormField.vue';
import Icon from './Icon.vue';
import SelectField from './SelectField.vue';

const props = defineProps<{
  value: Interests;
  errors: FieldErrors;
}>();

const emit = defineEmits<{
  back: [];
  next: [value: Interests];
}>();

const form = reactive(structuredClone(props.value));

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
  <form :class="styles.form" @submit.prevent="submit">
    <header :class="styles.heading">
      <h2>Gustos e intereses</h2>
      <p>Estos datos ayudan a explicar el flujo de validación sin meter reglas en los componentes.</p>
    </header>

    <div :class="styles.grid">
      <FormField id="music" v-model="form.music" icon="music" label="Música" placeholder="Jazz, indie, clásica..." :error="props.errors.music" />
      <FormField id="sports" v-model="form.sports" icon="activity" label="Deportes" placeholder="Natación, running..." :error="props.errors.sports" />
      <FormField id="hobbies" v-model="form.hobbies" icon="sparkles" label="Hobbies" placeholder="Lectura, cocina..." :error="props.errors.hobbies" />
      <FormField id="culturalInterests" v-model="form.culturalInterests" icon="message" label="Intereses culturales" placeholder="Teatro, museos..." :error="props.errors.culturalInterests" />
      <SelectField
        id="socialActivityLevel"
        v-model="form.socialActivityLevel"
        full-width
        icon="users"
        label="Nivel de actividad social"
        :error="props.errors.socialActivityLevel"
        :options="[
          { label: 'Selecciona una opción', value: '' },
          { label: 'Bajo', value: 'low' },
          { label: 'Medio', value: 'medium' },
          { label: 'Alto', value: 'high' },
        ]"
      />
    </div>

    <div :class="styles.actions">
      <button :class="styles.secondaryButton" type="button" @click="emit('back')">
        <Icon :class-name="styles.buttonIcon" name="arrow-left" />
        Anterior
      </button>
      <button :class="styles.primaryButton" type="submit">
        Siguiente
        <Icon :class-name="styles.buttonIcon" name="arrow-right" />
      </button>
    </div>
  </form>
</template>
