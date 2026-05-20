<script setup lang="ts">
import { reactive, toRaw, watch } from 'vue';
import type { FieldErrors, Preferences } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepForm.module.css';
import CheckboxField from './CheckboxField.vue';
import FormField from './FormField.vue';
import Icon from './Icon.vue';
import SelectField from './SelectField.vue';
import TextAreaField from './TextAreaField.vue';

const props = defineProps<{
  value: Preferences;
  errors: FieldErrors;
  isSaving: boolean;
}>();

const emit = defineEmits<{
  back: [];
  submit: [value: Preferences];
}>();

const form = reactive(structuredClone(props.value));

watch(
  () => props.value,
  (value) => {
    Object.assign(form, structuredClone(value));
  },
  { deep: true },
);

function submitForm() {
  emit('submit', structuredClone(toRaw(form)));
}
</script>

<template>
  <form :class="styles.form" @submit.prevent="submitForm">
    <header :class="styles.heading">
      <h2>Preferencias y objetivos</h2>
      <p>Último paso: definimos expectativas y consentimientos antes de guardar el perfil.</p>
    </header>

    <div :class="styles.grid">
      <TextAreaField id="appGoal" v-model="form.appGoal" icon="target" label="Qué buscas en la app" placeholder="Cuéntanos brevemente tu objetivo..." :error="props.errors.appGoal" />
      <SelectField
        id="communicationPreference"
        v-model="form.communicationPreference"
        icon="send"
        label="Preferencia de comunicación"
        :error="props.errors.communicationPreference"
        :options="[
          { label: 'Selecciona una opción', value: '' },
          { label: 'Email', value: 'email' },
          { label: 'Teléfono', value: 'phone' },
          { label: 'Sin comunicaciones', value: 'none' },
        ]"
      />
      <FormField id="cityOrArea" v-model="form.cityOrArea" icon="map-pin" label="Ciudad o zona" placeholder="Madrid centro" :error="props.errors.cityOrArea" />
      <SelectField
        id="expectedUsageFrequency"
        v-model="form.expectedUsageFrequency"
        icon="repeat"
        label="Frecuencia esperada de uso"
        :error="props.errors.expectedUsageFrequency"
        :options="[
          { label: 'Selecciona una opción', value: '' },
          { label: 'Diaria', value: 'daily' },
          { label: 'Semanal', value: 'weekly' },
          { label: 'Mensual', value: 'monthly' },
        ]"
      />
      <CheckboxField id="acceptsTerms" v-model="form.acceptsTerms" label="Acepto los términos del servicio" :error="props.errors.acceptsTerms" />
      <CheckboxField id="acceptsPrivacy" v-model="form.acceptsPrivacy" label="Acepto la política de privacidad" :error="props.errors.acceptsPrivacy" />
    </div>

    <div :class="styles.actions">
      <button :class="styles.secondaryButton" :disabled="props.isSaving" type="button" @click="emit('back')">
        <Icon :class-name="styles.buttonIcon" name="arrow-left" />
        Anterior
      </button>
      <button :class="styles.primaryButton" :disabled="props.isSaving" type="submit">
        {{ props.isSaving ? 'Guardando...' : 'Guardar perfil' }}
        <Icon :class-name="styles.buttonIcon" name="arrow-right" />
      </button>
    </div>
  </form>
</template>
