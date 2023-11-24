import styles from './LoginPage.module.css';
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import { loginUser } from '../services/api.js';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
	const [loading, setLoading] = useState(false);
	const [redirectToRoot, setRedirectToRoot] = useState(false);
	const { changeStateAuthenticated, changeStateToken, changeStateErrors } =
		useAuth();

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		const fields = Object.fromEntries(new FormData(e.target));
		const response = await loginUser(fields).catch(() => {
			changeStateErrors(['Servicio no disponible 😒']);
			setLoading(false);
		});
		if (response.result) {
			window.localStorage.setItem('token', response.data.token);
			changeStateErrors(null);
			changeStateAuthenticated(true);
			changeStateToken(response.data.token);
			setRedirectToRoot(true);
		} else {
			setLoading(false);
			changeStateErrors(response.response);
		}
	};

	if (redirectToRoot) {
		return <Navigate to='/' replace />;
	}

	return (
		<div className={styles.div}>
			<h2>Iniciar sesión</h2>
			<form onSubmit={handleSubmit} className={styles.form} autoComplete='off'>
				<label htmlFor='email'>Correo electrónico</label>
				<input
					type='email'
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
					placeholder='Hz!55K19'
					required
				/>
				<input
					type='submit'
					value={loading ? 'Enviando...' : 'Enviar'}
					disabled={loading}
				/>
			</form>
		</div>
	);
}
