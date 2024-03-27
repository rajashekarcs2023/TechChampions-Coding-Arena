import axios from "axios";
import { BACK_SERVER_URL } from "../config/config";

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACK_SERVER_URL}/user/signUp`,
      userData
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACK_SERVER_URL}/user/signIn`,
      userData
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${BACK_SERVER_URL}/user/forgotPassword`,
      { email }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (password, token) => {
  try {
    const response = await axios.put(`${BACK_SERVER_URL}/user/resetPassword`, {
      password,
      token,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const createProblem = async (problemData, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      `${BACK_SERVER_URL}/problems/add`,
      problemData,
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getProblemToEdit = async (problemId, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BACK_SERVER_URL}/problems/edit/${problemId}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getProblem = async (problemId, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BACK_SERVER_URL}/problems/${problemId}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProblem = async (token, problemId, problemData) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(
      `${BACK_SERVER_URL}/problems/edit/${problemId}`,
      problemData,
      { headers }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const fetchProblems = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BACK_SERVER_URL}/problems/list`, {
      headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProblem = async (token, problemId) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${BACK_SERVER_URL}/problems/delete/${problemId}`,
      {
        headers,
      }
    );
    return response.status === 200;
  } catch (error) {
    return error;
  }
};

export const submitProblem = async (data, token) => { 
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `${BACK_SERVER_URL}/problem/submit`,
      data,
      {
        headers,
      }
    ); 
    return response.data;
  } catch (error) { 
    return error;
  }
};

export const fetchSubmissions = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BACK_SERVER_URL}/submissions/history`, {
      headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const fetchScores = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${BACK_SERVER_URL}/submissions/leaderBoard`,
      {
        headers,
      }
    );
    return response.data.data;
  } catch (error) { 
    return error;
  }
};
