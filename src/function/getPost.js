import axios from 'axios';


export const getRequest = async (url, params = {}, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { params, headers });
    return await response.data;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
};


export const postRequest = async (url, data = {}, token) => {
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
};


export const patchRequest = async (url, data = {}, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    const response = await axios.patch(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in PATCH request:', error);
    throw error;
  }
};


export const deleteRequest = async (url, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in DELETE request:', error);
    throw error;
  }
};