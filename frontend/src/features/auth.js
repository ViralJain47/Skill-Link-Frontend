import usePostRequest from "../hooks/usePostRequest";
import useGetRequest from '../hooks/useGetRequest';

const login = async (credentials) => {
  const body = await usePostRequest(`${import.meta.env.VITE_API_URL}/api/auth/login`, credentials, {'Content-Type': 'application/json'})
  if(body?.error) return {error: body.error};
  else return body;
}

const register = async ({email, password, name}) => {
  const body = await usePostRequest(`${import.meta.env.VITE_API_URL}/api/auth/register`, {email, password, name}, {'Content-Type': 'application/json'});
  if(body?.error) return {error: body.error};
  else return body;

}

const verifyOtp = async (userId, otp) => {
  const body = await usePostRequest(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {userId, otp}, {'Content-type': 'application/json'});
  if(body?.error) return {error: body.error};
  else return body
}

const getUserData = async (token) => {
  const body = await useGetRequest(`${import.meta.env.VITE_API_URL}/api/auth/me`, {'Authorization': `Bearer ${token}`})
  if(body?.error) return {error: body.error};
  else return body;
}

export {
  login,
  register,
  verifyOtp,
  getUserData
}