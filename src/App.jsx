import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import Errors from './components/Errors.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
	return (
		<>
			<Header />
			<Navbar />
			<Errors />

			<Routes>
				<Route path='/cuenta/sesion' Component={LoginPage} />
				<Route path='/cuenta/registro' Component={RegisterPage} />

				<Route Component={ProtectedRoute}>
					<Route path='/' Component={HomePage} />
					<Route path='/perfil' Component={ProfilePage} />
					<Route path='/admin' Component={AdminPage} />
					<Route path='/cerrar' Component={LogoutPage} />
				</Route>
			</Routes>

			<Footer />
		</>
	);
}
