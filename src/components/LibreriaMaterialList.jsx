import React, { useEffect, useState } from "react";
import { getLibros, eliminarLibro } from "../api/libreriaMaterialService";
import "../styles.css";

export default function LibreriaMaterialList({ onEdit, onDelete }) {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarLibros();
  }, []);

  async function cargarLibros() {
    try {
      const response = await getLibros();
      console.log("Respuesta API libros:", response);

      // response es el array directamente, no response.data
      const librosData = Array.isArray(response) ? response : [];
      console.log("Libros a mostrar:", librosData);

      setLibros(librosData);
      setError(null);
    } catch (e) {
      console.error("Error al cargar libros:", e);
      setError(e.message);
      setLibros([]);
    }
  }

  async function handleEliminar(id) {
    if (!window.confirm("¿Seguro que quieres eliminar este libro?")) return;
    try {
      await eliminarLibro(id);
      await cargarLibros();
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!Array.isArray(libros) || libros.length === 0)
    return <p>No hay libros para mostrar.</p>;

  return (
    <table className="tabla-libros">
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Fecha Publicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro) => (
          <tr key={libro.libreriaMaterialId}>
            <td>{libro.titulo}</td>
            <td>{libro.autorLibro}</td>
            <td>
              {libro.fechaPublicacion
                ? new Date(libro.fechaPublicacion).toLocaleDateString()
                : ""}
            </td>
            <td>
              <button
                className="btn-accion btn-editar"
                onClick={() => onEdit(libro)}
              >
                Editar
              </button>
              <button
                className="btn-accion btn-eliminar"
                onClick={() => handleEliminar(libro.libreriaMaterialId)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
