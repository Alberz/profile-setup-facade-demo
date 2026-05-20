# Profile Setup Facade Demo

Proyecto educativo para enseñar una arquitectura frontend con un core de negocio agnóstico del framework y adapters de UI por framework.

La app implementa un onboarding de perfil en 3 pasos: datos personales, intereses y preferencias. React y Vue consumen el mismo core mediante fachadas distintas; el flujo vive en `application`; las reglas semánticas del dato viven en `domain`; el store externo solo guarda estado.

## Cómo leer el proyecto

1. Empieza por `AGENTS.md`: es la fuente de normas arquitectónicas.
2. Lee `src/modules/profile-setup/application/create-profile-setup-core.ts`: ahí vive el flujo compartido.
3. Después mira `src/modules/profile-setup/application/create-react-facade.ts` y `src/modules/profile-setup/application/create-vue-facade.ts`: son los adapters públicos de cada framework.
4. Mira los validadores por capa:
   - `domain/value-objects`: DNI, email y fecha de nacimiento.
   - `application/validators`: reglas para avanzar por paso.
5. Termina en `src/modules/profile-setup/ui/react/screens/ProfileSetupScreen.tsx` y `src/modules/profile-setup/ui/vue/screens/ProfileSetupVueScreen.vue`: verás la misma feature adaptada a dos UIs.

## Comandos

```bash
npm install
npm run dev
npm test
npm run lint
```
