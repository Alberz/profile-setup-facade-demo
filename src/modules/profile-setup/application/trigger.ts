import type { ProfileSetupEvent } from './events';

export type Trigger = (event: ProfileSetupEvent) => void;

export const silentTrigger: Trigger = () => undefined;
