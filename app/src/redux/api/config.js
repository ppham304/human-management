import axios from 'axios'

export const service = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}
});
