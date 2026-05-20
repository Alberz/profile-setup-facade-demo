<script setup lang="ts">
import type { ProfileSetupVueFacade } from '../../../application/create-vue-facade';
import styles from './ProfileSetupVueScreen.module.css';
import Icon from '../components/Icon.vue';
import InterestsStep from '../components/InterestsStep.vue';
import PersonalInfoStep from '../components/PersonalInfoStep.vue';
import PreferencesStep from '../components/PreferencesStep.vue';
import StepIndicator from '../components/StepIndicator.vue';

const props = defineProps<{
  facade: ProfileSetupVueFacade;
}>();

const activeStep = props.facade.useActiveStep();
const draft = props.facade.useDraft();
const fieldErrors = props.facade.useFieldErrors();
const isSaving = props.facade.useIsSaving();
const status = props.facade.useStatus();
</script>

<template>
  <main v-if="status === 'success'" :class="[styles.shell, styles.themeVue]">
    <section :class="styles.successCard">
      <span :class="styles.successIcon">
        <Icon name="check" />
      </span>
      <h1>Perfil guardado correctamente.</h1>
      <p>La UI solo conoce la fachada. El flujo y las reglas viven fuera de Vue.</p>
    </section>
  </main>

  <main v-else :class="[styles.shell, styles.themeVue]">
    <section :class="styles.card">
      <header :class="styles.hero">
        <div :class="styles.heroCopy">
          <h1>Configura tu perfil</h1>
          <p>La misma lógica de dominio y flujo, ahora adaptada a Vue con una paleta verde propia.</p>
        </div>
        <button :class="styles.demoButton" type="button" @click="props.facade.actions.fillWithValidSampleData">
          <Icon name="sparkles" />
          Rellenar demo
        </button>
      </header>

      <StepIndicator :active-step="activeStep" />

      <PersonalInfoStep
        v-if="activeStep === 'personal-info'"
        :key="JSON.stringify(draft.personalInfo)"
        :errors="fieldErrors"
        :value="draft.personalInfo"
        @next="(personalInfo) => { props.facade.actions.savePersonalInfo(personalInfo); props.facade.actions.next(); }"
      />

      <InterestsStep
        v-else-if="activeStep === 'interests'"
        :key="JSON.stringify(draft.interests)"
        :errors="fieldErrors"
        :value="draft.interests"
        @back="props.facade.actions.prev"
        @next="(interests) => { props.facade.actions.saveInterests(interests); props.facade.actions.next(); }"
      />

      <PreferencesStep
        v-else
        :key="JSON.stringify(draft.preferences)"
        :errors="fieldErrors"
        :is-saving="isSaving"
        :value="draft.preferences"
        @back="props.facade.actions.prev"
        @submit="(preferences) => { props.facade.actions.savePreferences(preferences); void props.facade.actions.submit(); }"
      />
    </section>
  </main>
</template>
