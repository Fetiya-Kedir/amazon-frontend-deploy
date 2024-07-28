import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: 'http://127.0.0.1:5001/clone-32915/us-central1/api',
	// deployed version of amazon server on Render server
	baseURL: 'https://my-amazon-7kbi.onrender.com',
});

export { axiosInstance };

