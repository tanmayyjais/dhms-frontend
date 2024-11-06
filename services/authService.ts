import axios from 'axios';

const API_URL = 'http://192.168.1.102:5000/api/auth';

interface AuthResponse {
  user: { name: string; email: string };
}

const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
  return response.data;
};

const signup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/signup`, { name, email, password });
  return response.data;
};

export default { login, signup };
