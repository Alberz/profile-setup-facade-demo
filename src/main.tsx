import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { createApp, type App as VueApp } from 'vue';
import styles from './demo-host.module.css';
import {
  createProfileSetupCore,
  createProfileSetupReactFacade,
  createProfileSetupVueFacade,
  ProfileSetupReactScreen,
  ProfileSetupVueScreen,
} from './modules/profile-setup';
import './styles.css';

type FrameworkName = 'react' | 'vue';

type MountedRenderer =
  | { kind: 'react'; instance: Root }
  | { kind: 'vue'; instance: VueApp };

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el nodo raíz de la demo.');
}

const shell = document.createElement('div');
shell.className = styles.page;
rootElement.append(shell);

shell.innerHTML = `
  <div class="${styles.frame}">
    <header class="${styles.switcher}">
      <div class="${styles.copy}">
        <h1>React y Vue sobre el mismo core</h1>
        <p>Misma lógica de negocio. Dos adapters de UI. Cambia de framework y compara.</p>
      </div>
      <div class="${styles.pills}" role="tablist" aria-label="Selecciona el renderer de la demo">
        <button class="${styles.pill}" data-framework="react" role="tab" type="button">React</button>
        <button class="${styles.pill}" data-framework="vue" role="tab" type="button">Vue</button>
      </div>
    </header>
    <div class="${styles.mount}" data-mount></div>
  </div>
`;

const mountElement = shell.querySelector<HTMLElement>('[data-mount]');
const buttons = Array.from(shell.querySelectorAll<HTMLButtonElement>('[data-framework]'));

if (!mountElement) {
  throw new Error('No se encontró el contenedor de montaje de la demo.');
}

const mountTarget = mountElement;

const core = createProfileSetupCore();
const reactFacade = createProfileSetupReactFacade(core);
const vueFacade = createProfileSetupVueFacade(core);
let activeRenderer: MountedRenderer | null = null;

function updateButtons(activeFramework: FrameworkName) {
  buttons.forEach((button) => {
    const isActive = button.dataset.framework === activeFramework;
    button.className = [styles.pill, isActive ? styles.pillActive : ''].filter(Boolean).join(' ');
    button.setAttribute('aria-selected', String(isActive));
    button.setAttribute('tabindex', isActive ? '0' : '-1');
  });
}

function unmountActiveRenderer() {
  if (!activeRenderer) return;

  if (activeRenderer.kind === 'react') {
    activeRenderer.instance.unmount();
  } else {
    activeRenderer.instance.unmount();
    mountTarget.innerHTML = '';
  }

  activeRenderer = null;
}

function mountFramework(framework: FrameworkName) {
  unmountActiveRenderer();

  if (framework === 'react') {
    const root = createRoot(mountTarget);
    root.render(
      <StrictMode>
        <ProfileSetupReactScreen facade={reactFacade} />
      </StrictMode>,
    );
    activeRenderer = { kind: 'react', instance: root };
  } else {
    const app = createApp(ProfileSetupVueScreen, { facade: vueFacade });
    app.mount(mountTarget);
    activeRenderer = { kind: 'vue', instance: app };
  }

  updateButtons(framework);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    mountFramework((button.dataset.framework as FrameworkName) ?? 'react');
  });
});

mountFramework('react');
