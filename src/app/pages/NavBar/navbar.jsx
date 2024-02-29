"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  // Obtenemos la ruta actual del router de Next.js
  const router = useRouter();

  return (
    <nav className="">
      <div className="container justify-content-center d-flex align-content-center ">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <Link href="/pages/ListarNotas">
              <p
                className={
                  router.pathname === "/pages/ListarNotas"
                    ? "nav-link active "
                    : "nav-link"
                }
              >
                ToDoList
              </p>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/pages/Formulario/crear">
              <p
                className={
                  router.pathname === "/pages/Formulario/crear"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Agregar
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
