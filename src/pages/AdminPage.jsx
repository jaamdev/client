import styles from './AdminPage.module.css';
import { useEffect, useState } from 'react';
import { getAllUsers, getUserTasks, removeUser } from '../services/api.js';
import useAuth from '../hooks/useAuth.js';
import UserTasks from '../components/UserTasks.jsx';

export default function AdminPage() {
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);
	const [userTasks, setUserTasks] = useState(null);
	const [showTabTasks, setShowTabTasks] = useState(false);
	const { isAuthenticated, token } = useAuth();

	const getUsers = async () => {
		const response = await getAllUsers(token);
		if (!response.result) return setLoading(false);
		setUsers(response.data);
		setLoading(false);
	};

	const showTasks = async id => {
		setLoading(true);
		const response = await getUserTasks(token, id);
		if (!response.result) return setLoading(false);
		setUserTasks(response.data);
		setShowTabTasks(true);
		setLoading(false);
	};

	const deleteUser = async id => {
		const response = await removeUser(token, id);
		if (!response.result) return;
		const newUsers = users.filter(user => user._id !== id);
		setUsers(newUsers);
	};

	useEffect(() => {
		getUsers();
	}, [isAuthenticated]);

	const usersFiltered = users.filter(user => user.admin !== true);

	return (
		<main className={styles.main}>
			{showTabTasks ? (
				<UserTasks
					loading={loading}
					userTasks={userTasks}
					setShowTabTasks={setShowTabTasks}
				/>
			) : (
				''
			)}
			{!loading ? (
				!showTabTasks ? (
					usersFiltered.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Correo</th>
									<th>Acción</th>
								</tr>
							</thead>
							<tbody>
								{usersFiltered?.map(user => (
									<tr key={user._id}>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td className={styles.actions}>
											<button
												onClick={() => showTasks(user._id)}
												className={styles.btnTask}
											>
												Tareas
											</button>
											<button
												onClick={() => deleteUser(user._id)}
												className={styles.btnDelete}
											>
												Borrar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<h2>No hay usuarios</h2>
					)
				) : (
					''
				)
			) : (
				<h2>Cargando...</h2>
			)}
		</main>
	);
}
