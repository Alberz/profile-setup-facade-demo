<script setup lang="ts">
import styles from '../../shared/styles/Icon.module.css';
import { iconPaths, type IconName } from '../../shared/icon-paths';

const props = defineProps<{
  name: IconName;
  className?: string;
}>();

const strokeProps = {
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.9,
};
</script>

<template>
  <svg aria-hidden="true" :class="[styles.icon, props.className]" fill="none" viewBox="0 0 24 24">
    <path v-for="path in iconPaths[props.name]" :key="path" v-bind="strokeProps" :d="path" />
  </svg>
</template>
