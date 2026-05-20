import { fireEvent, render, screen } from '@testing-library/vue';
import { describe, expect, it } from 'vitest';
import { createProfileSetupVueFacade } from '../../../application/create-vue-facade';
import ProfileSetupVueScreen from '../screens/ProfileSetupVueScreen.vue';

describe('ProfileSetupVueScreen', () => {
  it('lets the user complete the main onboarding flow', async () => {
    const facade = createProfileSetupVueFacade({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    render(ProfileSetupVueScreen, { props: { facade } });

    await fireEvent.update(screen.getByLabelText('Nombre'), 'Ada');
    await fireEvent.update(screen.getByLabelText('Apellidos'), 'Lovelace');
    await fireEvent.update(screen.getByLabelText('Fecha de nacimiento'), '1990-01-01');
    await fireEvent.update(screen.getByLabelText('DNI'), '12345678Z');
    await fireEvent.update(screen.getByLabelText('Email'), 'ada@example.com');
    await fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));

    await fireEvent.update(screen.getByLabelText('Música'), 'Jazz');
    await fireEvent.update(screen.getByLabelText('Deportes'), 'Natación');
    await fireEvent.update(screen.getByLabelText('Hobbies'), 'Lectura');
    await fireEvent.update(screen.getByLabelText('Intereses culturales'), 'Teatro');
    await fireEvent.update(screen.getByLabelText('Nivel de actividad social'), 'medium');
    await fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));

    await fireEvent.update(screen.getByLabelText('Qué buscas en la app'), 'Conocer gente afín');
    await fireEvent.update(screen.getByLabelText('Preferencia de comunicación'), 'email');
    await fireEvent.update(screen.getByLabelText('Ciudad o zona'), 'Madrid centro');
    await fireEvent.update(screen.getByLabelText('Frecuencia esperada de uso'), 'weekly');
    await fireEvent.click(screen.getByLabelText('Acepto los términos del servicio'));
    await fireEvent.click(screen.getByLabelText('Acepto la política de privacidad'));
    await fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(await screen.findByText('Perfil guardado correctamente.')).toBeInTheDocument();
  });

  it('fills all onboarding steps with valid demo data from a button outside the form', async () => {
    const facade = createProfileSetupVueFacade({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    render(ProfileSetupVueScreen, { props: { facade } });

    await fireEvent.click(screen.getByRole('button', { name: 'Rellenar demo' }));

    expect(screen.getByLabelText('Nombre')).toHaveValue('Ada');
    expect(screen.getByLabelText('Apellidos')).toHaveValue('Lovelace');
    expect(screen.getByLabelText('Fecha de nacimiento')).toHaveValue('1990-01-01');
    expect(screen.getByLabelText('DNI')).toHaveValue('12345678Z');
    expect(screen.getByLabelText('Email')).toHaveValue('ada@example.com');

    await fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(await screen.findByText('Perfil guardado correctamente.')).toBeInTheDocument();
  });

  it('shows the DNI help modal', async () => {
    const facade = createProfileSetupVueFacade({ saveProfile: async () => {} });
    render(ProfileSetupVueScreen, { props: { facade } });

    await fireEvent.click(screen.getByRole('button', { name: 'Ayuda sobre el DNI' }));

    expect(screen.getByRole('dialog', { name: 'Ayuda sobre el DNI' })).toBeInTheDocument();
  });

  it('shows checkbox validation errors on the final step', async () => {
    const facade = createProfileSetupVueFacade({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    render(ProfileSetupVueScreen, { props: { facade } });

    await fireEvent.click(screen.getByRole('button', { name: 'Rellenar demo' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    await fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }));
    await fireEvent.click(screen.getByLabelText('Acepto los términos del servicio'));
    await fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(await screen.findByText('Debes aceptar los términos.')).toBeInTheDocument();
  });
});
