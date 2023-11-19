import styles from './ProtectedRoute.module.css';

import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function ProtectedRoute() {
	const { isAuthenticated, loading } = useAuth();

	if (loading) return <h2 className={styles.loading}>Cargando...</h2>;
	if (!isAuthenticated && !loading)
		return <Navigate to='/cuenta/sesion' replace />;

	return <Outlet />;
}
