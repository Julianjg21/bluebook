import React from "react";

function LoginForm() {
  return (
    <div className=" p-0 ">
      <div className="row ">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-5"></div>
      </div>
      <div className="row ">
        <div className="col-1"></div>
        <div className="col-10 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1   border border-2 border-primary-emphasis">
          <h1 className="fs-6  text-primary mt-2 ">Blue NoteBook</h1>
        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 auth-cols">
          <div className="row bg-white">
            <form>
              <h1 className="fs-5 mt-3 text-primary-emphasis">
                Iniciar Sesión
              </h1>
              <div className="row mt-2">
                <div className="col-12 d-flex flex-column mt-4">
                  <label
                    className="mb-1  loginLabelTxt fw-semibold"
                    for="userEmail"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    className="rounded-5 border-secondary form-control  mt-1"
                    placeholder="Ingresa tu correo electronico"
                    id="userEmail"
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12 d-flex flex-column">
                  <label
                    className="loginLabelTxt mt-2 mb-1 fw-semibold"
                    for="userPassword"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="rounded-5 border-secondary form-control  mt-1"
                    placeholder="Ingresa tu contraseña"
                    id="userPassword"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-4 mb-4 ">
                  <button
                    type="submit"
                    className="w-100 pt-2 pb-2 btn btn-outline-dark"
                  >
                    Ingresar
                  </button>
                </div>
                <div className="col-2"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}
export default LoginForm;
