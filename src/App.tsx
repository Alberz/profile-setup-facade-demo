import { useMemo } from 'react';
import { createProfileSetupFacade, ProfileSetupScreen } from './modules/profile-setup';

export function App() {
  const facade = useMemo(() => createProfileSetupFacade(), []);

  return <ProfileSetupScreen facade={facade} />;
}
