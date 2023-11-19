import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			With ❤️{' '}
			<a
				href='http://github.com/jaamdev'
				target='_blank'
				rel='noopener noreferrer'
			>
				JaamDev
			</a>
		</footer>
	);
}
