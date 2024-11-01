import axios from "axios";

export const createBoard = async (values) => {
  const response = await axios.post("/api/boards", values);
  return response.data;
};

export const updateBoard = async (id, values) => {
  const response = await axios.put(`/api/boards/${id}`, values);
  return response.data;
};
