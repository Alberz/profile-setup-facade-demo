# Profile Setup Facade Demo

Proyecto educativo para enseñar una arquitectura frontend donde React actúa principalmente como capa de presentación.

La app implementa un onboarding de perfil en 3 pasos: datos personales, intereses y preferencias. La UI consume una fachada estable; el flujo vive en `application`; las reglas semánticas del dato viven en `domain`; el store externo solo guarda estado.

## Cómo leer el proyecto

1. Empieza por `AGENTS.md`: es la fuente de normas arquitectónicas.
2. Lee `src/modules/profile-setup/application/create-facade.ts`: es la API pública que usa React.
3. Mira los validadores por capa:
   - `domain/value-objects`: DNI, email y fecha de nacimiento.
   - `application/validators`: reglas para avanzar por paso.
4. Termina en `ui/screens/profile-setup-screen.tsx`: verás que la pantalla orquesta componentes sin conocer detalles internos.

## Comandos

```bash
npm install
npm run dev
npm test
npm run lint
```
