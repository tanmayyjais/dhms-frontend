// redux/actions/authActions.ts
import axios from 'axios';  // Import axios directly without `.default`
import { AppDispatch } from '../store';
import { loginSuccess, logout } from '../reducers/authReducer';
import { SignupData, User } from '../types';

// Login action
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post('http://192.168.1.102:5000/api/students/login', { email, password });
      const { token, user } = response.data;
  
      if (!token || !user) {
        throw new Error('Login failed: Invalid response data');
      }
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(loginSuccess({ user, token }));
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Ensure the error is thrown so the calling function can catch it
    }
  };
// Signup action
export const signup = (data: SignupData) => async () => {
  try {
    await axios.post('http://192.168.1.102:5000/api/students/register', data);
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

// Logout action
export const logoutUser = () => (dispatch: AppDispatch) => {
  delete axios.defaults.headers.common['Authorization'];
  dispatch(logout());
};
