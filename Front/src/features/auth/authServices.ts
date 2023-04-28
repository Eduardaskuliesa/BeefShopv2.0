import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002',
});

const register = async (userData:any) => {
  const response = await api.post('/api/register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
