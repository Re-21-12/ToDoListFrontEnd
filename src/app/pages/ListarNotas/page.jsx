"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import {
  getNotas,
  deleteNota,
  filtrarNotaNombre,
  filtrarNotaEstado,
} from "../../../Api/api.ts";

export default function Page() {
  const [notas, setNotas] = useState([]);
  const [filtrarNombre, setFiltrarNombre] = useState("");
  const [filtrarEstado, setFiltrarEstado] = useState("");
  const router = useRouter();

  const formatDate = (dateString) => {
    return dateString.substring(0, 10).replaceAll("-", "/");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const notasData = await getNotas();
      setNotas(notasData);
    } catch (error) {
      console.error("Error al obtener las notas:", error);
    }
  };

  const eliminar = async (id) => {
    try {
      const updatedNotas = notas.filter((nota) => nota.id !== id);
      setNotas(updatedNotas);
      await deleteNota(id);
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  const filtrarNotas = async () => {
    let notasFiltradas = await getNotas();
    if (filtrarNombre) {
      notasFiltradas = notasFiltradas.filter((nota) =>
        nota.titulo.toLowerCase().includes(filtrarNombre.toLowerCase())
      );
    } else if (filtrarEstado != "") {
      notasFiltradas = notasFiltradas.filter(
        (nota) => nota.estado === filtrarEstado
      );
    } else {
      notasFiltradas = [];
    }
    setNotas(notasFiltradas);
  };

  const limpiarFiltros = () => {
    setFiltrarNombre("");
    setFiltrarEstado("");
    fetchData();
  };

  return (
    <div className="container shadow-md">
      <h1 className="mt-5 mb-12">Lista de Notas</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-4 col-lg-3">
          <input
            className="form-control form-control-sm mb-2"
            value={filtrarNombre}
            onChange={(e) => setFiltrarNombre(e.target.value)}
            placeholder="Filtrar por nombre"
          />
        </div>
        <div className="col-md-4 col-lg-3">
          <select
            className="form-control form-control-sm mb-2"
            value={filtrarEstado}
            onChange={(e) => setFiltrarEstado(e.target.value)}
          >
            <option value=""></option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="col-md-4 col-lg-3">
          <button
            className="btn btn-outline-dark mb-2 me-md-2"
            onClick={filtrarNotas}
          >
            <i className="bi bi-search"></i>
          </button>
          <button
            className="btn btn-outline-dark mb-2"
            onClick={limpiarFiltros}
          >
            <i className="bi bi-x-square-fill"></i>
          </button>
        </div>
      </div>
      {notas.length === 0 && <div>No hay tareas</div>}
      <ul className="list-group mt-4">
        {notas.map((nota) => (
          <li
            key={nota.id}
            className="list-group-item d-flex justify-content-between align-items-center bg-black text-white"
          >
            <div>
              <strong>{nota.titulo}</strong>
              <div className="col-8 text-truncate">{nota.descripcion}</div>
              <div>Fecha de entrega: {formatDate(nota.fecha_entrega)}</div>
              <div>
                {nota.estado === "Todo" ? (
                  <i className="bi bi-list-task text-danger">Todo</i>
                ) : nota.estado === "In Progress" ? (
                  <i className="bi bi-arrow-right-circle text-warning">
                    In Progress
                  </i>
                ) : (
                  <i className="bi bi-check-all text-success">Done</i>
                )}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => router.push(`Formulario/${nota.id}`)}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => eliminar(nota.id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
