import styles from './EditTask.module.css';
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import { updateTask } from '../services/api.js';

export default function EditTask({ editingTask, setTabEditTask, editTask }) {
	const [loading, setLoading] = useState(false);
	const { changeStateErrors, token } = useAuth();
	const { _id, title, desc, done, date } = editingTask;

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		const fields = Object.fromEntries(new FormData(e.target));
		const newFields = {
			_id,
			title: fields.title,
			desc: fields.desc,
			done,
			date,
		};
		const response = await updateTask(token, newFields);
		if (!response.result) {
			changeStateErrors(response.response);
		} else {
			changeStateErrors(response.response);
			editTask(response.data);
			setTabEditTask(false);
		}
		setLoading(false);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
			<input
				type='submit'
				value={loading ? 'Guardando...' : 'Guardar'}
				disabled={loading}
			/>
			<label htmlFor='title'>Título</label>
			<input
				type='text'
				id='title'
				name='title'
				defaultValue={title}
				required
			/>
			<label htmlFor='desc'>Descripción</label>
			<textarea id='desc' name='desc' defaultValue={desc} required></textarea>
		</form>
	);
}
