import axios from "axios";


const API_URL = "https://localhost:7155/api/LibreriaMaterial";

export async function getLibros() {
  const response = await axios.get(API_URL);
  return response.data; // retornamos el array directamente
}

export async function getLibroPorId(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function crearLibro(libro) {
  const response = await axios.post(API_URL, libro);
  return response.data;
}

export async function actualizarLibro(id, libro) {
  const response = await axios.put(`${API_URL}/${id}`, libro);
  return response.data;
}

export async function eliminarLibro(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
