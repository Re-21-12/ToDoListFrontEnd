import React from "react";

function Footer() {
  return (
    <footer className="text-center bg-body-tertiary bg-light text-black fixed-bottom mb-0">
      <div className="container pt-4">
        <section className="mb-4">
          <h5>Contacto</h5>
          <ul className="list-unstyled d-flex justify-content-center">
            <li className="me-3">
              <a
                href="https://www.linkedin.com/in/victor-macario-9163a9255/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-decoration-none btn-link btn-floating"
              >
                <i className="bi bi-linkedin text-primary"></i>
              </a>
            </li>
            <li className="me-3">
              <a
                href="https://wa.me/whatsappphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-decoration-none"
              >
                <i className="bi bi-whatsapp text-success"></i>
                <span className="ms-2">4535 7994</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Re-21-12"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-decoration-none"
              >
                <i className="bi bi-github text-warning"></i>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
