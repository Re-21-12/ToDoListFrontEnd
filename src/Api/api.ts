import axios from "axios";
import Nota from "../models/Nota";

export const getNotas = async (): Promise<Nota[]> => {
  return axios
    .get<Nota[]>(`http://localhost:1333/notas`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getNota = async (id?: number): Promise<Nota> => {
  return axios
    .get<Nota>(`http://localhost:1333/nota/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const filtrarNotaNombre = async (nombre?: string): Promise<Nota> => {
  return axios
    .get<Nota>(`http://localhost:1333/notaNombre/${nombre}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const filtrarNotaEstado = async (estado?: string): Promise<Nota> => {
  return axios
    .get<Nota>(`http://localhost:1333/notaEstado/${estado}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const postNota = async (Nota: Nota): Promise<Nota> => {
  return (
    axios
      //aqui le mandamos la nota a agregar
      .post<Nota>(`http://localhost:1333/nota`, Nota)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
  );
};

export const deleteNota = async (id?: number): Promise<boolean> => {
  return (
    axios
      //aqui le mandamos la nota a agregar
      .delete<boolean>(`http://localhost:1333/nota/${id}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
  );
};

/* editarMateria(id: number, materia: Materium): Observable<Materium> {
    return this.http.put<Materium>(`${this.url}Materiums/${id}`, materia);
  } */

export const patchNota = async (id: number, Nota: Nota): Promise<Nota> => {
  return (
    axios   
      //aqui le mandamos la nota a agregar
      .patch<Nota>(`http://localhost:1333/nota/${id}`, Nota)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
  );
};
