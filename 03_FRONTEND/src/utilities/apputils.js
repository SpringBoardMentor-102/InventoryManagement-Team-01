import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//function Used by Unprotected Routes
const fetchDataUnprotected = async (method, endpoint, body) => {
  try {
    const response = await axios[method](`${BACKEND_URL}/${endpoint}`, body);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// function Used by Protected Routes
const fetchData = async (method, endpoint, body) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  try {
    const response = await axios[method](
      `${BACKEND_URL}/${endpoint}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      body
    );
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchDataUnprotected, fetchData };
