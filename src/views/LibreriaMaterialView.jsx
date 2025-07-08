import React, { useState } from "react";
import LibreriaMaterialList from "../components/LibreriaMaterialList";
import LibreriaMaterialForm from "../components/LibreriaMaterialForm";
import BuscarLibroPorId from "../components/BuscarLibroPorId"; // <-- Importa el buscador
import {
  crearLibro,
  actualizarLibro,
} from "../api/libreriaMaterialService";

export default function LibreriaMaterialView() {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  function handleEditar(libro) {
    setLibroSeleccionado(libro);
    setModoEdicion(true);
    setMensaje(null);
    setError(null);
  }

  function handleCancelar() {
    setModoEdicion(false);
    setLibroSeleccionado(null);
    setMensaje(null);
    setError(null);
  }

  async function handleGuardar(libro) {
    try {
      if (libro.libreriaMaterialId) {
        // Actualizar
        await actualizarLibro(libro.libreriaMaterialId, libro);
        setMensaje("Libro actualizado correctamente.");
      } else {
        // Crear
        await crearLibro(libro);
        setMensaje("Libro creado correctamente.");
      }
      setModoEdicion(false);
      setLibroSeleccionado(null);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Gestión de Libros</h1>

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {modoEdicion ? (
        <LibreriaMaterialForm
          libro={libroSeleccionado}
          onSave={handleGuardar}
          onCancel={handleCancelar}
        />
      ) : (
        <>
          <button
            onClick={() => {
              setLibroSeleccionado(null);
              setModoEdicion(true);
              setMensaje(null);
              setError(null);
            }}
          >
            Agregar Nuevo Libro
          </button>

          {/* Aquí insertamos el buscador */}
          <BuscarLibroPorId />

          <LibreriaMaterialList onEdit={handleEditar} />
        </>
      )}
    </div>
  );
}
