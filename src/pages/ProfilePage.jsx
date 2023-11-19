import styles from './ProfilePage.module.css';
import { useState, useEffect } from 'react';
import { loginUser, getProfile, deleteUser } from '../services/api.js';
import useAuth from '../hooks/useAuth.js';
import EditUser from '../components/EditUser.jsx';

export default function ProfilePage() {
	const [profile, setProfile] = useState(null);
	const [tabEditUser, setTabEditUser] = useState(false);
	const { token, changeStateAuthenticated, changeStateErrors } = useAuth();

	const updateProfile = profile => setProfile(profile);

	const deleteAccount = async () => {
		const password = window.prompt('Escriba su contraseña actual');
		if (!password) return;
		const result = await loginUser({ email: profile.email, password });
		if (!result.result) {
			changeStateErrors(result.response);
			return;
		}
		const answer = window.confirm('¿Seguro que quiere eliminar su cuenta?');
		if (!answer) return;
		const response = await deleteUser(token);
		if (!response.result) {
			changeStateErrors(response.response);
			return;
		}

		window.localStorage.clear();
		changeStateErrors(response.response);
		setTimeout(() => {
			changeStateErrors(null);
			changeStateAuthenticated(false);
		}, 2000);
	};

	const fetchProfile = async () => {
		const response = await getProfile(token);
		if (!response.result) {
			changeStateErrors(response.response);
			return;
		}
		setProfile(response.data);
		changeStateErrors(null);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<main className={styles.main}>
			<h2>Perfil</h2>

			{!profile ? (
				<h3>Cargando...</h3>
			) : profile && tabEditUser ? (
				<EditUser
					profile={profile}
					updateProfile={updateProfile}
					setTabEditUser={setTabEditUser}
				/>
			) : (
				<Profile
					profile={profile}
					tabEditUser={tabEditUser}
					setTabEditUser={setTabEditUser}
					deleteAccount={deleteAccount}
				/>
			)}
		</main>
	);
}

function Profile({ profile, tabEditUser, setTabEditUser, deleteAccount }) {
	return (
		<ul>
			<li>Nombre:</li>
			<li>{profile.name}</li>
			<li>Correo electrónico:</li>
			<li>{profile.email}</li>
			<li>Contraseña:</li>
			<li>****</li>
			<li>
				<button onClick={() => setTabEditUser(!tabEditUser)}>Editar</button>
			</li>
			<li>
				<button onClick={deleteAccount}>Borrar cuenta</button>
			</li>
		</ul>
	);
}
