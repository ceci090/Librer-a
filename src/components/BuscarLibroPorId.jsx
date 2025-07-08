import React, { useState } from "react";
import { getLibroPorId } from "../api/libreriaMaterialService";
import "../styles.css";

export default function BuscarLibroPorId() {
  const [id, setId] = useState("");
  const [libro, setLibro] = useState(null);
  const [error, setError] = useState("");

  const esGuidValido = (id) => {
    const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regexGuid.test(id);
  };

  const manejarBusqueda = async () => {
    setError("");
    setLibro(null);

    if (!id) {
      setError("Por favor, ingresa un ID.");
      return;
    }

    if (!esGuidValido(id)) {
      setError("El ID debe tener formato GUID válido.");
      return;
    }

    try {
      const resultado = await getLibroPorId(id);
      if (resultado.data) {
        setLibro(resultado.data);
        setError("Libro encontrado.");
      } else {
        setLibro(resultado);
        setError("Libro encontrado.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "No se encontró un libro con ese ID.");
    }
  };

  const manejarLimpiar = () => {
    setId("");
    setLibro(null);
    setError("");
  };

  return (
    <div>
      

      
      <h2>Buscar libro por ID</h2>
      <div className="form-control">
        <input
          type="text"
          placeholder="Ingresa ID del libro"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={manejarBusqueda}>Buscar</button>

        {(id || libro) && (
          <button
            onClick={manejarLimpiar}
            style={{ backgroundColor: "#9ca3af", boxShadow: "none" }}
            title="Limpiar búsqueda"
          >
            🧹 Limpiar
          </button>
        )}
      </div>

      {error && (
        <div className={error === "Libro encontrado." ? "success" : "error"}>
          {error}
        </div>
      )}

      {libro && (
        <div className="libro-info">
          <h3>Datos del libro</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.entries(libro).map(([clave, valor]) => (
              <li key={clave} style={{ marginBottom: "8px" }}>
                <strong>{clave}:</strong>{" "}
                {clave.toLowerCase().includes("fecha") && valor
                  ? new Date(valor).toLocaleDateString()
                  : typeof valor === "object" && valor !== null
                  ? JSON.stringify(valor, null, 2)
                  : valor?.toString() || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
