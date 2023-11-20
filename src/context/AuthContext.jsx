import { createContext, useState, useEffect } from 'react';
import { verifyToken } from '../services/api.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState({ _id: '', name: '', admin: false });
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState(null);

	const changeStateAuthenticated = input => setIsAuthenticated(input);
	const changeStateToken = input => setToken(input);
	const changeStateUser = input => setUser(input);
	const changeStateLoading = input => setLoading(input);
	const changeStateErrors = input => setErrors(input);

	useEffect(() => {
		async function getLocalStorage() {
			setLoading(true);
			const hasToken = window.localStorage.getItem('token');
			if (!hasToken) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}

			try {
				const res = await verifyToken(hasToken);
				if (!res.result) {
					window.localStorage.clear();
					setIsAuthenticated(false);
					setToken(null);
					setUser(null);
					setErrors(res.response);
					return;
				}
				setIsAuthenticated(true);
				setToken(hasToken);
				setUser({
					_id: res.data._id,
					name: res.data.name,
					admin: res.data.admin,
				});
				setErrors(null);
			} catch (error) {
				setIsAuthenticated(false);
				setToken(null);
				setUser(null);
				setErrors(['Servicio no disponible 😒']);
			} finally {
				setLoading(false);
			}
		}
		getLocalStorage();
	}, [isAuthenticated]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				token,
				user,
				loading,
				errors,
				changeStateAuthenticated,
				changeStateToken,
				changeStateUser,
				changeStateLoading,
				changeStateErrors,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
