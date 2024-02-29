"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import {
  postNota,
  getNota,
  patchNota,
} from "@/Api/api";

function Page() {
  const [titulo, setTitle] = useState("");
  const [descripcion, setDescription] = useState("");
  const [fecha_entrega, setFecha_entrega] = useState("");
  const [estado, setEstado] = useState("");
  const [noValido, setNoValido] = useState(false);
  const router = useRouter();
  const params = useParams();

  console.log(params);
  let Nota = {
    titulo,
    descripcion,
    fecha_entrega,
    estado,
  };

  let NotaId = {
    id: params.id,
    titulo,
    descripcion,
    fecha_entrega,
    estado,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (params.id == "crear") {
      postNota(Nota);
    } else {
      patchNota(params.id, NotaId);
    }

    /* console.log("Título:", titulo);
    console.log("Descripción:", descripcion);
    console.log("Fecha de entrega:", fecha_entrega); */
    router.push("/pages/ListarNotas");
  };

  useEffect(() => {
    const obtenerNota = async () => {
      if (params.id != "crear") {
        console.log(params.titulo);
        /*         setTitle(params.titulo)
        setDescription(params.descripcion)
        setFecha_entrega(params.fecha_entrega)
        setEstado(parmas.estado)
 */ const nota = await getNota(params.id);
        setTitle(nota.titulo);
        setDescription(nota.descripcion);
        setFecha_entrega(nota.fecha_entrega);
        setEstado(nota.estado);
      }
    };
    obtenerNota();
  }, [params]);

  useEffect(() => {
    // Check if all required fields are filled
    setNoValido(
      titulo.length > 0 &&
        descripcion.length > 0 &&
        fecha_entrega.length > 0 &&
        estado.length > 0
    );
  }, [titulo, descripcion, fecha_entrega, estado]);
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h1 className="mb-4">
          {params.id != "crear"
            ? `Editando Nota no. ${params.id}`
            : "Agregando"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="descripcion"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="fecha_entrega" className="form-label">
              Fecha de entrega
            </label>
            <input
              type="date"
              className="form-control"
              id="fecha_entrega"
              value={fecha_entrega}
              onChange={(e) => setFecha_entrega(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <select
              className="form-control"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option   ></option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!noValido}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
