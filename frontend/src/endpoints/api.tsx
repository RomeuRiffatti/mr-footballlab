import axios from "axios";

export const BASE_URL = "https://discerning-charisma-production.up.railway.app"



export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = async (username: string, password: string) => {
  const response = await api.post(
    'token',
    { username: username, password: password },
    
  );
  return response.data.success;
};

export const refresh_token = async () => {
  const response = await axios.post('refresh', {}, { withCredentials: true });
  return response.data.refreshed;
};



export const logout = async () => {
  try {
    await api.post('logout');
    return true;
  } catch (error) {
    return false;
  }
};



export const is_authenticated = async () => {
  try {
    await api.post('is_authenticated', {})
    return true
  } catch (error) {
    return false
  }
}