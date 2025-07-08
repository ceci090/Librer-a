import React, { useEffect, useState } from "react";
import "../styles.css";

export default function LibreriaMaterialForm({ libro, onSave, onCancel }) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");

  useEffect(() => {
    if (libro) {
      setTitulo(libro.titulo || "");
      setAutor(libro.autorLibro || "");
      setFechaPublicacion(
        libro.fechaPublicacion
          ? new Date(libro.fechaPublicacion).toISOString().substring(0, 10)
          : ""
      );
    } else {
      setTitulo("");
      setAutor("");
      setFechaPublicacion("");
    }
  }, [libro]);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      ...libro,
      titulo,
      autorLibro: autor,
      fechaPublicacion: fechaPublicacion
        ? new Date(fechaPublicacion).toISOString()
        : null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="formulario-libro">
      <div>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Autor:
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Fecha de Publicación:
          <input
            type="date"
            value={fechaPublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
          />
        </label>
      </div>

      <div className="botones-formulario">
        <button type="submit" className="btn-form btn-guardar">
          Guardar
        </button>
        <button type="button" className="btn-form btn-cancelar" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
