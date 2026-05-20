<script setup lang="ts">
import type { StepId } from '../../../domain/models/profile-setup';
import styles from '../../shared/styles/StepIndicator.module.css';

const props = defineProps<{
  activeStep: StepId;
}>();

const steps: Array<{ id: StepId; label: string }> = [
  { id: 'personal-info', label: 'Tus datos' },
  { id: 'interests', label: 'Tus intereses' },
  { id: 'preferences', label: 'Confirmación' },
];

function getStateClass(index: number, activeIndex: number) {
  if (index < activeIndex) return styles.complete;
  if (index === activeIndex) return styles.active;
  return '';
}
</script>

<template>
  <ol :class="styles.stepper" aria-label="Progreso del onboarding">
    <span
      aria-hidden="true"
      :class="[
        styles.progress,
        steps.findIndex((step) => step.id === props.activeStep) === 0
          ? styles.progressStart
          : steps.findIndex((step) => step.id === props.activeStep) === 1
            ? styles.progressMiddle
            : styles.progressEnd,
      ]"
    />
    <li
      v-for="(step, index) in steps"
      :key="step.id"
      :aria-current="step.id === props.activeStep ? 'step' : undefined"
      :class="[styles.step, getStateClass(index, steps.findIndex((currentStep) => currentStep.id === props.activeStep))]"
    >
      <span :class="styles.circle">{{ index + 1 }}</span>
      {{ step.label }}
    </li>
  </ol>
</template>
