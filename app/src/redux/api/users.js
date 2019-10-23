import { service } from './config';

export const getListUser = () => {
	return service.request({
		method: 'GET',
		url: `/api/users`,
	});
}

export const getUserDetail = (id) => {
	return service.request({
		method: 'GET',
		url: `/api/users/${id}`,
	});
}

export const addUser = (data) => {
	return service.request({
		method: 'POST',
		url: `/api/users`,
		data: data,
	});
}

export const updateUser = (id, data) => {
	return service.request({
		method: 'PUT',
		url: `/api/users/${id}`,
		data: data,
	});
}

export const deleteUser = (id) => {
	return service.request({
		method: 'DELETE',
		url: `/api/users/${id}`,
	});
}

export const logWork = (id, data) => {
	return service.request({
		method: 'PUT',
		url: `/api/users/${id}/logwork`,
		data: data,
	});
}
