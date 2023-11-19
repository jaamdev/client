import styles from './EditUser.module.css';
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import { loginUser, updateUser } from '../services/api.js';
import { EyeOpenIcon, EyeClosedIcon } from './Icons.jsx';

export default function EditUser({ profile, updateProfile, setTabEditUser }) {
	const [showPass, setShowPass] = useState(false);
	const { token, changeStateErrors } = useAuth();

	const handleSubmit = async e => {
		e.preventDefault();
		const fields = Object.fromEntries(new FormData(e.target));
		if (!fields.name || !fields.email || !fields.password) {
			changeStateErrors(['Hay campos vacíos']);
			return;
		}

		if (fields.password) {
			const oldPassword = window.prompt('Escriba su anterior contraseña');
			if (!oldPassword) return;
			const body = { email: profile.email, password: oldPassword };
			const response = await loginUser(body);
			if (!response.result) {
				changeStateErrors(response.response);
				return;
			}
		}

		const answer = window.confirm(
			'¿Seguro que quiere cambiar sus credenciales?',
		);
		if (!answer) return;

		const response = await updateUser(token, fields);
		if (!response.result) {
			changeStateErrors(response.response);
			return;
		}

		updateProfile(response.data);
		changeStateErrors(response.response);
		setTabEditUser(false);
	};

	return (
		<form className={styles.form} autoComplete='off' onSubmit={handleSubmit}>
			<label htmlFor='name'>Nombre:</label>
			<input type='text' id='name' name='name' defaultValue={profile.name} />
			<label htmlFor='email'>Correo electrónico:</label>
			<input
				type='email'
				id='email'
				name='email'
				defaultValue={profile.email}
			/>
			<label htmlFor='password'>Contraseña:</label>
			<div className={styles.div}>
				<input
					type={showPass ? 'text' : 'password'}
					id='password'
					name='password'
					placeholder='12Kn541!'
				/>
				{showPass ? (
					<button type='button' onClick={() => setShowPass(!showPass)}>
						<EyeOpenIcon />
					</button>
				) : (
					<button type='button' onClick={() => setShowPass(!showPass)}>
						<EyeClosedIcon />
					</button>
				)}
			</div>
			<button type='button' onClick={() => setTabEditUser(false)}>
				Cancelar
			</button>
			<button type='submit'>Guardar</button>
		</form>
	);
}
