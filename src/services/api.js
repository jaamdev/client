const URL = import.meta.env.VITE_API_URL;

// USERS
export const getProfile = async token => {
	try {
		const result = await fetch(`${URL}/cuenta`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const verifyToken = async token => {
	try {
		const result = await fetch(`${URL}/cuenta/verificar`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const loginUser = async body => {
	try {
		const result = await fetch(`${URL}/cuenta/sesion`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(body),
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const registerUser = async body => {
	try {
		const result = await fetch(`${URL}/cuenta/registro`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(body),
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const updateUser = async (token, body) => {
	try {
		const result = await fetch(`${URL}/cuenta`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});
		const response = result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const deleteUser = async token => {
	try {
		const result = await fetch(`${URL}/cuenta`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset:UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

// TASKS
export const getTasks = async token => {
	try {
		const result = await fetch(`${URL}/tarea`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const getTask = async () => {};
export const createTask = async (token, body) => {
	try {
		const result = await fetch(`${URL}/tarea`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});
		const response = result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const updateTask = async (token, body) => {
	try {
		const result = await fetch(`${URL}/tarea/${body._id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const deleteTask = async (token, params) => {
	try {
		const result = await fetch(`${URL}/tarea/${params}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};

// ADMINS
export const getAllUsers = async token => {
	try {
		const result = await fetch(`${URL}/admin`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const getUserTasks = async (token, id) => {
	try {
		const result = await fetch(`${URL}/admin/${id}`, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
export const removeUser = async (token, id) => {
	try {
		const result = await fetch(`${URL}/admin/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${token}`,
			},
		});
		const response = await result.json();
		return response;
	} catch (error) {
		throw new Error(error);
	}
};
