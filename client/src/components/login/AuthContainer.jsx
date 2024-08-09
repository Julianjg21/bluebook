import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthContainer() {
  const navigate = useNavigate();

  return (
    <div className="p-0">
      <div className="row">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-5"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1">
          <h1 className="fs-6 text-primary mt-2">Blue NoteBook</h1>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 bg-white text-info align-content-center border border-1 border-primary auth-cols">
          <p className="text-dark mt-3">
            Al registrarte, podrás guardar tus notas y verlas cuando quieras. Si
            ya estás registrado, inicia sesión.
          </p>
          <div className="row">
            <div className="col-12 col-md-6">
              <button
                onClick={() => navigate("/login/login")}
                className="w-100 p-2 btn btn-primary mb-2 fw-bolder"
              >
                Iniciar Sesión
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button
                onClick={() => navigate("/login/register")}
                className="w-100 p-2 btn btn-light mb-2 border-secondary text-primary fw-bolder"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-bottom-3">
          <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="/" element={<p>Selecciona una opción para continuar.</p>} />
          </Routes>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default AuthContainer;
