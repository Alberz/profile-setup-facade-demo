<script setup lang="ts">
import styles from '../../shared/styles/FormControls.module.css';

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    modelValue: boolean;
    error?: string;
  }>(),
  {
    error: undefined,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<template>
  <div :class="styles.fullWidth">
    <label :class="[styles.checkboxField, props.error ? styles.hasError : '']" :for="props.id">
      <input
        :id="props.id"
        :checked="props.modelValue"
        type="checkbox"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span :class="styles.checkboxLabel">{{ props.label }}</span>
    </label>
    <p v-if="props.error" :id="`${props.id}-error`" :class="[styles.error, styles.checkboxError]" role="alert">{{ props.error }}</p>
  </div>
</template>
