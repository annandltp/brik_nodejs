// api.js
export const getAxiosConfig = () => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
  
    // Set up the Axios headers to include the Bearer token
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    return axiosConfig;
};

export const getBaseUrl = () => {
    const baseUrl = "http://localhost:8000/api";

    return baseUrl; 
}