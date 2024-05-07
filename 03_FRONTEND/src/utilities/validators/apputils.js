import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const fetchData = async (endpoint) => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await axios.get(`${BACKEND_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export default fetchData;