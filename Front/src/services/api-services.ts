import axios from 'axios';
import { RegisterFormFields } from 'types/register-form';

const api = axios.create({
  baseURL: 'http://localhost:5002',
});

const register = async (user: RegisterFormFields) => {
  api.post('/api/register', user)
    .catch((error) => {
      console.log(error.response.data);
    });
};

const apiServices = {
  register,
};

export default apiServices;
