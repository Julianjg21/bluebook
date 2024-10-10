import React, { useState, useContext } from "react";
import axios from "axios";
import VerifyCodeReset from "./VerifyCodeReset";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";
import { RenderContext } from "../../../hooks/contexts/renderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function ResetPassword() {
  //advance and render to next component
  const [nextStep, setNextStep] = useState(false);
  const [email, setEmail] = useState("");
  const { renderComponent } = useContext(RenderContext); //Using context to change which component is rendered
  const sendEmail = async (event) => {
    event.preventDefault();
    const data = {
      email,
    };
    try {
      await axios.post(API_ROUTES.resetPassword, data);
      setNextStep(true);
    } catch (error) {
      console.error(`fallo la validacion del email, error: ${error}`);
    }
  };

  return (
    <div>
      {nextStep ? (
        <VerifyCodeReset email={email} />
      ) : (
        <div className="container">
          <div className="row d-none d-sm-block">
            <div className="col-5"></div>
            <div className="col-5"></div>
            <div className="col-2 mt-5"></div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
              <h1 className="fs-6 text-primary  text-secondary mt-0 mt-md-2 text-center">
                Blue NoteBook
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6  bg-white   border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
              <button
                type="button"
                className=" border-0 rounded-0 bg-white"
                onClick={() => renderComponent("AuthContainer")}
              >
                <FontAwesomeIcon className="text-primary" icon={faArrowLeft} />
              </button>
              <h1 className="fs-6  fw-bold   text-secondary mt-0 mt-md-4 text-center">
                Restablecer Contraseña
              </h1>
              <form className="form-control border border-0" onSubmit={sendEmail}>
                <div className="row p-3 ">
                  <div className="col-12 mt-4 text-center">
                    <label className="">
                      Ingresa tu correo electronico registrado:
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 mt-4 ">
                        <input
                          className="w-100 rounded-5 border-secondary form-control"
                          placeholder="Ingresa tu correo electonico "
                          type="email"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12 mt-5  mb-5">
                      <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 mt-2">
                          <button
                            className="w-100  p-2 btn btn-primary mb-2 fw-bolder"
                            type="submit"
                          >
                            Buscar
                          </button>
                        </div>
                        <div className="col-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
