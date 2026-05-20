# AGENTS.md

## Propósito educativo

Este repositorio enseña una forma mantenible y didáctica de estructurar una feature frontend compleja: un onboarding de perfil en 3 pasos. No busca la forma más rápida de hacer un formulario en React; busca mostrar separación de responsabilidades, testabilidad y una API pública estable para la UI.

React es la capa de presentación. La lógica de negocio, las reglas semánticas del dato y el flujo de aplicación viven fuera de los componentes grandes y fuera de hooks complejos.

## Principios de arquitectura

- React renderiza UI y adapta la feature al framework.
- Los componentes deben ser pequeños, explícitos y centrados en pintar estado.
- Los hooks se reservan para lógica de interfaz o adaptación a React: estado efímero, foco, DOM, modales, popovers, touched, sincronización con stores externos.
- La lógica de negocio y de flujo no debe vivir dentro de componentes ni hooks de UI.
- La UI consume una fachada estable del módulo; no conoce detalles internos del store ni de eventos.
- La feature debe poder leerse por capas: `domain`, `application`, `store`, `ui`.
- Si se soportan varios frameworks, el core del módulo vive en `application` y cada framework añade su adapter/facade y su UI sin duplicar la lógica de negocio.
- Prioridad de decisiones: claridad pedagógica, separación de responsabilidades, sencillez y testabilidad.

## Convenciones de carpetas

```txt
src/
└── modules/
    └── profile-setup/
        ├── domain/
        │   ├── models/
        │   ├── value-objects/
        │   └── rules/
        ├── application/
        │   ├── validators/
        │   ├── create-profile-setup-core.ts
        │   ├── create-react-facade.ts
        │   ├── create-vue-facade.ts
        │   ├── create-facade.ts
        │   ├── events.ts
        │   └── trigger.ts
        ├── store/
        │   ├── create-store.ts
        │   └── initial-state.ts
        ├── ui/
        │   ├── react/
        │   ├── vue/
        │   └── shared/
        └── index.ts
```

### Responsabilidades

- `domain`: modelos, value objects e invariantes semánticas. Aquí va lo que hace que un dato tenga sentido para el negocio.
- `application`: flujo de caso de uso, validadores de paso, acciones, submit y decisiones como “puede avanzar”.
- `store`: estado externo mínimo, suscripción y actualización. No debe contener reglas de negocio complejas.
- `ui`: componentes, pantallas y hooks de presentación. No debe conocer eventos internos ni estructura privada del store.
- `ui/shared`: assets y estilos puramente presentacionales que pueden reutilizar React y Vue.
- `index.ts`: API pública del módulo.

## Reglas de validación por capa

- Si una validación define si el dato tiene sentido en el negocio, va en `domain`.
  - Ejemplos: DNI, email, fecha de nacimiento, edad mínima.
- Si define si un paso puede avanzar o si una acción puede ejecutarse, va en `application`.
  - Ejemplos: `validatePersonalInfoStep`, `validateInterestsStep`, `validatePreferencesStep`.
- Si solo afecta a cómo se muestra ayuda o error al usuario, va en `ui`.
  - Ejemplos: `touched`, mensajes visibles tras `blur`, modal/popover de ayuda del DNI.

No crear un archivo por cada input salvo que el campo tenga peso semántico real. DNI, email y fecha de nacimiento sí justifican value objects o reglas propias.

## Normas para React, hooks y facade

- La feature debe exponer un core agnóstico (`createProfileSetupCore(...)`) y adapters/facades por framework.
- Cada facade expone acciones (`init`, `next`, `prev`, `save`, etc.) y lecturas adaptadas a su framework (`useActiveStep`, `useIsSaving`, `useError`, etc.).
- Los componentes no importan el store directamente.
- Los componentes no disparan eventos internos directamente.
- Los hooks de `ui/hooks` no contienen reglas de negocio; contienen interacción de interfaz.
- `useSyncExternalStore` es válido para conectar React con el store externo sencillo.

## Comandos

- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev`
- Tests: `npm test`
- Tests con UI: `npm run test:ui`
- Lint: `npm run lint`

## Checklist para cualquier cambio futuro

- [ ] ¿La lógica nueva está en la capa correcta?
- [ ] ¿React sigue siendo principalmente presentación?
- [ ] ¿La UI consume la fachada y no detalles internos?
- [ ] ¿Los hooks nuevos son de UI/adaptación y no de negocio?
- [ ] ¿Las validaciones semánticas están en `domain`?
- [ ] ¿Las reglas de avance/submit están en `application`?
- [ ] ¿El store sigue siendo simple?
- [ ] ¿Los nombres explican intención sin leer implementación?
- [ ] ¿Hay tests útiles para dominio, aplicación o flujo UI?
- [ ] ¿Se evitó sobreingeniería?
