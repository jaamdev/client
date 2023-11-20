import styles from './HomePage.module.css';
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getTasks, updateTask, deleteTask } from '../services/api.js';
import { EditIcon, RemoveIcon } from '../components/Icons.jsx';
import CreateTask from '../components/CreateTask.jsx';
import EditTask from '../components/EditTask.jsx';
dayjs.extend(utc);

export default function HomePage() {
	const [tasks, setTasks] = useState([]);
	const [editingTask, setEditingTask] = useState(null);
	const [tabNewTask, setTabNewTask] = useState(false);
	const [tabEditTask, setTabEditTask] = useState(false);
	const { user, token, changeStateAuthenticated, changeStateErrors } =
		useAuth();

	const hasTasks = tasks.length > 0;

	async function fetchTasks() {
		const response = await getTasks(token);
		if (!response.result) {
			changeStateErrors(response.response);
			changeStateAuthenticated(false);
			return;
		}
		setTasks(response.data);
	}

	const addTask = task => {
		setTasks(prevState => {
			const newTask = [task, ...prevState];
			return newTask;
		});
	};

	const toggleEditTask = task => {
		setEditingTask(task);
		setTabEditTask(!tabEditTask);
	};

	const editTask = task => {
		const removeTask = tasks.filter(item => item._id !== task._id);
		const newTasks = [task, ...removeTask];
		setTasks(newTasks);
	};

	const changeCheckbox = async task => {
		task.done = !task.done;
		const response = await updateTask(token, task);
		if (!response.result) {
			changeStateErrors(response.response);
			return;
		}
		editTask(response.data);
	};

	const removeTask = async task => {
		const response = await deleteTask(token, task._id);
		if (!response.result) {
			changeStateErrors(response.response);
			return;
		} else changeStateErrors(null);
		const newTasks = tasks.filter(item => item._id !== task._id);
		setTasks(newTasks);
	};

	useEffect(() => {
		fetchTasks();
	}, [token]);

	return (
		<>
			<main className={styles.main}>
				<h2 className={styles.h2}>{user?.name}</h2>
				{tasks.length === 1 ? (
					<h3 className={styles.h3}>Tienes {tasks.length} tarea</h3>
				) : (
					<h3 className={styles.h3}>Tienes {tasks.length} tareas</h3>
				)}
				{!tabEditTask && (
					<button
						className={styles.btnadd}
						onClick={() => setTabNewTask(!tabNewTask)}
					>
						Añadir tareas
					</button>
				)}
				{tabNewTask && <CreateTask addTask={addTask} />}
				{tabEditTask && (
					<EditTask
						editingTask={editingTask}
						setTabEditTask={setTabEditTask}
						editTask={editTask}
					/>
				)}
				{!tabNewTask && !tabEditTask ? (
					hasTasks ? (
						<WithTasks
							tasks={tasks}
							toggleEditTask={toggleEditTask}
							changeCheckbox={changeCheckbox}
							removeTask={removeTask}
						/>
					) : (
						<NoTasks />
					)
				) : (
					''
				)}
			</main>
		</>
	);
}

function WithTasks({ tasks, toggleEditTask, changeCheckbox, removeTask }) {
	const sortedTasks = tasks.sort(
		(a, b) => Date.parse(a.date) - Date.parse(b.date),
	);

	return (
		<ul className={styles.ul}>
			{sortedTasks.map(task => (
				<li key={task._id}>
					<div className={styles.tasks}>
						<input
							className={styles.checkbox}
							type='checkbox'
							checked={task.done}
							onChange={() => changeCheckbox(task)}
						/>
						<h3 className={styles.h3}>{task.title}</h3>
						<p className={styles.desc}>{task.desc}</p>
						<p className={styles.date}>
							{dayjs(task.date).utc().format('HH:MM DD/MM/YYYY')}
						</p>
					</div>
					<div className={styles.actions}>
						<button
							className={styles.btnedit}
							title='Editar tarea'
							onClick={() => toggleEditTask(task)}
						>
							<EditIcon />
						</button>
						<button
							className={styles.btnremove}
							title='Borrar tarea'
							onClick={() => removeTask(task)}
						>
							<RemoveIcon />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}

function NoTasks() {
	return (
		<ul className={styles.ul}>
			<li className={styles.notasks}>No hay tareas</li>
		</ul>
	);
}
