import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { createProfileSetupReactFacade } from '../../../application/create-react-facade';
import { ProfileSetupReactScreen } from '../screens/ProfileSetupScreen';

describe('ProfileSetupReactScreen', () => {
  it('lets the user complete the main onboarding flow', async () => {
    const user = userEvent.setup();
    const facade = createProfileSetupReactFacade({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    render(<ProfileSetupReactScreen facade={facade} />);

    await user.type(screen.getByLabelText('Nombre'), 'Ada');
    await user.type(screen.getByLabelText('Apellidos'), 'Lovelace');
    await user.type(screen.getByLabelText('Fecha de nacimiento'), '1990-01-01');
    await user.type(screen.getByLabelText('DNI'), '12345678Z');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    await user.type(screen.getByLabelText('Música'), 'Jazz');
    await user.type(screen.getByLabelText('Deportes'), 'Natación');
    await user.type(screen.getByLabelText('Hobbies'), 'Lectura');
    await user.type(screen.getByLabelText('Intereses culturales'), 'Teatro');
    await user.selectOptions(screen.getByLabelText('Nivel de actividad social'), 'medium');
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    await user.type(screen.getByLabelText('Qué buscas en la app'), 'Conocer gente afín');
    await user.selectOptions(screen.getByLabelText('Preferencia de comunicación'), 'email');
    await user.type(screen.getByLabelText('Ciudad o zona'), 'Madrid centro');
    await user.selectOptions(screen.getByLabelText('Frecuencia esperada de uso'), 'weekly');
    await user.click(screen.getByLabelText('Acepto los términos del servicio'));
    await user.click(screen.getByLabelText('Acepto la política de privacidad'));
    await user.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(await screen.findByText('Perfil guardado correctamente.')).toBeInTheDocument();
  });

  it('fills all onboarding steps with valid demo data from a button outside the form', async () => {
    const user = userEvent.setup();
    const facade = createProfileSetupReactFacade({ now: () => new Date('2026-05-15'), saveProfile: async () => {} });
    render(<ProfileSetupReactScreen facade={facade} />);

    await user.click(screen.getByRole('button', { name: 'Rellenar demo' }));

    expect(screen.getByLabelText('Nombre')).toHaveValue('Ada');
    expect(screen.getByLabelText('Apellidos')).toHaveValue('Lovelace');
    expect(screen.getByLabelText('Fecha de nacimiento')).toHaveValue('1990-01-01');
    expect(screen.getByLabelText('DNI')).toHaveValue('12345678Z');
    expect(screen.getByLabelText('Email')).toHaveValue('ada@example.com');

    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    expect(screen.getByLabelText('Música')).toHaveValue('Jazz');
    expect(screen.getByLabelText('Deportes')).toHaveValue('Natación');
    expect(screen.getByLabelText('Hobbies')).toHaveValue('Lectura');
    expect(screen.getByLabelText('Intereses culturales')).toHaveValue('Teatro');
    expect(screen.getByLabelText('Nivel de actividad social')).toHaveValue('medium');

    await user.click(screen.getByRole('button', { name: 'Siguiente' }));

    expect(screen.getByLabelText('Qué buscas en la app')).toHaveValue('Conocer gente afín');
    expect(screen.getByLabelText('Preferencia de comunicación')).toHaveValue('email');
    expect(screen.getByLabelText('Ciudad o zona')).toHaveValue('Madrid centro');
    expect(screen.getByLabelText('Frecuencia esperada de uso')).toHaveValue('weekly');
    expect(screen.getByLabelText('Acepto los términos del servicio')).toBeChecked();
    expect(screen.getByLabelText('Acepto la política de privacidad')).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(await screen.findByText('Perfil guardado correctamente.')).toBeInTheDocument();
  });

  it('shows DNI help through a UI-only modal hook', async () => {
    const user = userEvent.setup();
    const facade = createProfileSetupReactFacade({ saveProfile: async () => {} });
    render(<ProfileSetupReactScreen facade={facade} />);

    await user.click(screen.getByRole('button', { name: 'Ayuda sobre el DNI' }));

    expect(screen.getByRole('dialog', { name: 'Ayuda sobre el DNI' })).toBeInTheDocument();
  });
});
