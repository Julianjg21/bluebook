// src/components/login/AuthContainer.jsx
import React, {useContext} from "react";
import { RenderContext } from "../../contexts/renderContext";
function AuthContainer() {
  const {  renderComponent } = useContext(RenderContext);

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
          <div className="col-1"></div>
          <div className="row">
            <div className="col-12 col-md-6">
              <button
                onClick={() => renderComponent("LoginForm")}
                className="w-100 p-2 btn btn-primary mb-2 fw-bolder"
              >
                Iniciar Sesion
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button
                onClick={() => renderComponent("RegisterForm")}
                className="w-100 p-2 btn btn-light mb-2 border-secondary text-primary fw-bolder"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-bottom-3">
          <p className="text-dark mt-3">
            Al registrarte, podrás guardar tus notas y verlas cuando quieras. Si
            ya estás registrado, inicia sesión.
          </p>
          <div className="col-1"></div>
          <div className="row">
            <div className="col-12">
              <button className="w-100 p-2 btn btn-outline-danger mb-2 border-secondary fw-bolder mt-3 mb-4">
                Iniciar sin Registrarme
              </button>
            </div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default AuthContainer;
