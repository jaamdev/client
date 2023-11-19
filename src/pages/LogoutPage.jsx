import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function LogoutPage() {
	const [returnToRoot, setReturnToRoot] = useState(false);
	const { changeStateAuthenticated, changeStateErrors } = useAuth();

	const logout = () => {
		const answer = window.confirm('¿Quiere cerrar sesión?');
		if (!answer) {
			setReturnToRoot(true);
			return;
		}
		window.localStorage.clear();
		changeStateErrors(['Sesión cerrada con éxito']);
		setTimeout(() => {
			changeStateErrors(null);
			changeStateAuthenticated(false);
		}, 3000);
	};

	useEffect(() => {
		logout();
	}, []);

	if (returnToRoot) return <Navigate to='/' replace />;

	return <h2></h2>;
}
