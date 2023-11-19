import styles from './RegisterPage.module.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { registerUser } from '../services/api.js';

export default function RegisterPage() {
	const [redirectToLogin, setRedirectToLogin] = useState(false);
	const { changeStateErrors } = useAuth();

	const handleSubmit = async e => {
		e.preventDefault();
		const fields = Object.fromEntries(new FormData(e.target));
		const response = await registerUser(fields);
		if (response.result) {
			changeStateErrors(response.response);
			setRedirectToLogin(true);
		} else {
			changeStateErrors(response.response);
		}
	};

	if (redirectToLogin) {
		return <Navigate to='/cuenta/sesion' />;
	}

	return (
		<div className={styles.div}>
			<h2>Crear cuenta</h2>
			<form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
				<label htmlFor='name'>Nombre</label>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='Hugo, Aldo...'
					required
				/>
				<label htmlFor='email'>Correo electrónico</label>
				<input
					type='text'
					id='email'
					name='email'
					placeholder='correo@example.com'
					required
				/>
				<label htmlFor='password'>Contraseña</label>
				<input
					type='password'
					id='password'
					name='password'
					placeholder='b51L5!'
					required
				/>
				<input type='submit' value='Enviar' />
			</form>
		</div>
	);
}
