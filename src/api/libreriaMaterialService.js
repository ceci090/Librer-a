import axios from "axios";

const API_URL = "http://www.autorceci.somee.com/api/LibreriaMaterial";

// Obtener todos los libros
export async function getLibros() {
  const response = await axios.get(API_URL);
  return response.data.data; // Retornamos solo el array de libros
}

// Obtener un libro por su ID
export async function getLibroPorId(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data; // Retornamos solo el objeto libro
}

// Crear un nuevo libro
export async function crearLibro(libro) {
  const response = await axios.post(API_URL, libro);
  return response.data.data; // Retornamos el libro creado
}

// Actualizar un libro existente
export async function actualizarLibro(id, libro) {
  const response = await axios.put(`${API_URL}/${id}`, libro);
  return response.data.data; // Retornamos el libro actualizado
}

// Eliminar un libro
export async function eliminarLibro(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.data; // Retornamos confirmación u objeto eliminado
}
