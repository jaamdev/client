import styles from './CreateTask.module.css';
import useAuth from '../hooks/useAuth.js';
import { createTask } from '../services/api.js';

export default function CreateTask({ addTask }) {
	const { changeStateErrors, token } = useAuth();

	const handleSubmit = async e => {
		e.preventDefault();
		const fields = Object.fromEntries(new FormData(e.target));
		const response = await createTask(token, fields);
		if (response.result) {
			changeStateErrors(response.response);
			addTask(response.data);
			e.target.reset();
		} else changeStateErrors(response.response);
	};

	return (
		<div className={styles.div}>
			<h2>Crear tarea nueva</h2>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<label htmlFor='title'>Título</label>
				<input
					type='text'
					id='title'
					name='title'
					placeholder='Escribir un título...'
					required
				/>
				<label htmlFor='date'>Fecha</label>
				<div className={styles.time}>
					<input type='date' id='date' name='date' />
					<input type='time' id='time' name='time' />
				</div>
				<label htmlFor='desc'>Descripción</label>
				<textarea
					id='desc'
					name='desc'
					placeholder='Escribir una descripción...'
					required
				></textarea>
				<input type='submit' value='Crear tarea' />
			</form>
		</div>
	);
}
