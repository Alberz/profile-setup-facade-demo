<script setup lang="ts">
import type { IconName } from '../../shared/icon-paths';
import styles from '../../shared/styles/FormControls.module.css';
import Icon from './Icon.vue';

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    icon: IconName;
    modelValue: string;
    error?: string;
    fullWidth?: boolean;
    type?: string;
    placeholder?: string;
  }>(),
  {
    error: undefined,
    fullWidth: false,
    type: 'text',
    placeholder: '',
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <div :class="[styles.field, props.fullWidth ? styles.fullWidth : '']">
    <div :class="styles.labelRow">
      <label :class="styles.label" :for="props.id">{{ props.label }}</label>
      <slot name="action" />
    </div>
    <div :class="[styles.controlShell, props.error ? styles.hasError : '']">
      <Icon :class-name="styles.icon" :name="props.icon" />
      <input
        :id="props.id"
        :aria-describedby="props.error ? `${props.id}-error` : undefined"
        :class="styles.input"
        :placeholder="props.placeholder"
        :type="props.type"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="props.error" :id="`${props.id}-error`" :class="styles.error" role="alert">{{ props.error }}</p>
  </div>
</template>
