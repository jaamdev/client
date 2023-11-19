import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function Navbar() {
	const { isAuthenticated, user } = useAuth();

	return (
		<nav className={styles.nav}>
			{isAuthenticated ? (
				<NavLink
					to='/'
					style={({ isActive }) => {
						return { backgroundColor: isActive ? '#09f' : '' };
					}}
				>
					Inicio
				</NavLink>
			) : (
				''
			)}
			{!isAuthenticated ? (
				<NavLink
					to='/cuenta/sesion'
					style={({ isActive }) => {
						return { backgroundColor: isActive ? '#09f' : '' };
					}}
				>
					Iniciar sesión
				</NavLink>
			) : (
				''
			)}
			{!isAuthenticated ? (
				<NavLink
					to='/cuenta/registro'
					style={({ isActive }) => {
						return { backgroundColor: isActive ? '#09f' : '' };
					}}
				>
					Registrarse
				</NavLink>
			) : (
				''
			)}
			{isAuthenticated ? (
				<NavLink
					to='/perfil'
					style={({ isActive }) => {
						return { backgroundColor: isActive ? '#09f' : '' };
					}}
				>
					Perfil
				</NavLink>
			) : (
				''
			)}
			{isAuthenticated && user?.admin ? (
				<NavLink
					to='/admin'
					style={({ isActive }) => {
						return { backgroundColor: isActive ? '#09f' : '' };
					}}
				>
					Admin
				</NavLink>
			) : (
				''
			)}
			{isAuthenticated ? (
				<NavLink
					to='/cerrar'
					style={({ isActive }) => {
						return { backgroundColor: isActive ? '#09f' : '' };
					}}
				>
					Salir
				</NavLink>
			) : (
				''
			)}
		</nav>
	);
}
