import React, { useContext } from "react";
import AuthContainer from "../components/login/AuthContainer";
import person_taking_notes from "../Images/person_taking_notes.jpg";
import notebook from "../Images/notebook.jpg";
import { RenderContext } from "../contexts/renderContext";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";

function LoginPage() {
  const { component } = useContext(RenderContext);

  return (
    <div className="background-image p-0 align-content-center">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4"></div>
        <div className="col-4">
          <img
            className="h-50 rounded-circle notebookImg"
            src={notebook}
            alt="notebook"
          />
        </div>
      </div>
      <div className="row auth-container">
        <div className="col-10 col-md-4 align-content-center">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <p className="bg-white rounded-4 border border-1 border-primary text-primary opacity-75 fw-semibold frase">
                "Todo comienza con una nota."
              </p>
            </div>
            <div className="col-3"></div>
          </div>
          <img
            className="h-50 w-50 rounded-circle opacity-75 person-taking-notes"
            src={person_taking_notes}
            alt="person taking notes"
          />
        </div>
        <div className="col-10 col-md-4">
          <div>
            {/* Renderiza el componente dependiendo del contexto o la ruta */}
            {component === "LoginForm" ? (
              <LoginForm />
            ) : component === "RegisterForm" ? (
              <RegisterForm />
            ) : (
              <AuthContainer />
            )}
          </div>
        </div>
        <div className="col-10 col-md-4"></div>
      </div>
    </div>
  );
}

export default LoginPage;
