import useAuth from '../hooks/useAuth.js';
import styles from './Errors.module.css';

export default function Errors() {
	const { errors } = useAuth();

	return (
		<div className={styles.div}>
			{errors ? (
				<ul className={styles.ul}>
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			) : (
				''
			)}
		</div>
	);
}
