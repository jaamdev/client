import styles from './UserTasks.module.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function UserTasks({ loading, userTasks, setShowTabTasks }) {
	return (
		<>
			{!loading ? (
				userTasks.length > 0 ? (
					<main className={styles.main}>
						<button
							className={styles.btnBack}
							onClick={() => setShowTabTasks(false)}
						>
							Volver
						</button>
						<table>
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Descripción</th>
									<th>Fecha</th>
								</tr>
							</thead>
							<tbody>
								{userTasks?.map(task => (
									<tr key={task._id}>
										<td>{task.title}</td>
										<td>
											{task.desc.length > 30
												? task.desc.split(' ', 10).join(' ') + '...'
												: task.desc}
										</td>
										<td>{dayjs(task.date).utc().format('HH:MM DD/MM/YYYY')}</td>
									</tr>
								))}
							</tbody>
						</table>
					</main>
				) : (
					<>
						<button
							className={styles.btnBack}
							onClick={() => setShowTabTasks(false)}
						>
							Volver
						</button>
						<h2 className={styles.h2}>No hay tareas</h2>
					</>
				)
			) : (
				<h2>Cargando...</h2>
			)}
		</>
	);
}
