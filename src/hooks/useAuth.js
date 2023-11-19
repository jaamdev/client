import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export default function useAuth() {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error('useAuth debería estar dentro de un AuthProvider');
	return context;
}
