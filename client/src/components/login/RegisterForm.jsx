import React, { useState, useContext } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { RenderContext } from "../../hooks/contexts/renderContext";
import API_ROUTES from "../../configs/ApiEndPoints.mjs";
function RegisterForm() {
  //State to handle the form input fields
  const [name, setName] = useState(""); //Store the user name
  const [email, setEmail] = useState(""); //Store the user's email
  const [password, setPassword] = useState(""); //Store the user's password
  const [typeConfirmation, setTypeConfirmation] = useState(false); //Stores whether the operation was successful (true) or failed (false)
  //We get the function to render other components from the context
  const { renderComponent } = useContext(RenderContext);

  //State to handle the message displayed in the modal
  const [Message, setMessage] = useState("");

  //State to control whether the message modal should be displayed or not
  const [showMessage, setShowMessage] = useState(false);

  //Handles registration form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); //Prevent page reload when submitting the form
    const data = {
      name,
      email,
      password, //We get the form data
    };

    try {
     //We send the form data to the server
      const sendFormData = await axios.post(
        API_ROUTES.sendKeysRegister,
        data
      );

      //If the operation is successful, we display the confirmation message
      setShowMessage(true);
      setTypeConfirmation(true);
      setMessage(sendFormData.data.message);
    } catch (error) {
     //If there is an error, we display the error message
      const errorMessage =
        error.response?.data?.error ||
        "Completa los campos correctamente e intentalo de nuevo."; //Custom error message
      setShowMessage(true);
      setTypeConfirmation(false); //Indicamos que la ooperation was unsuccessful
      setMessage(errorMessage); //Show the error message
      console.error(
        "Error trying to register data",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="p-0">
      {/*Top section with spacing */}
      <div className="row">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-5"></div>
      </div>
      {/*Registration form title */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
          <h1 className="fs-6 text-primary mt-2 text-center">Blue NoteBook</h1>
        </div>
        <div className="col-3"></div>
      </div>

    {/*Registration form */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 auth-cols">
          <div className="row bg-white">
            <form onSubmit={handleSubmit}>
              <div className="row">
               {/*Button to return to the previous component */}
                <div className="col-1 p-0">
                  <button
                    type="button"
                    className="btn btn-outline-primary border-0 rounded-0"
                    onClick={() => renderComponent("AuthContainer")}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className="col-10">
                  <h1 className="fs-5 mt-3 text-primary-emphasis text-center">
                    Registrarse
                  </h1>
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mt-2">
                <div className="col-12 d-flex flex-column mt-4">
                  <label
                    className="mb-1 loginLabelTxt fw-semibold"
                    htmlFor="userName"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Ingresa tu nombre"
                    id="userName"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-12 d-flex flex-column mt-4">
                  <label
                    className="mb-1 loginLabelTxt fw-semibold"
                    htmlFor="userEmail"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Ingresa tu correo electrónico"
                    id="userEmail"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

          
              <div className="row mt-2">
                <div className="col-12 d-flex flex-column">
                  <label
                    className="loginLabelTxt mt-2 mb-1 fw-semibold"
                    htmlFor="userPassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Enter a password"
                    id="userPassword"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

              {/*Form submit button */}
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-4 mb-4">
                  <button
                    type="submit"
                    className="w-100 pt-2 pb-2 btn btn-outline-dark"
                  >
                    Registrar
                  </button>
                </div>
                <div className="col-2"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-3"></div>
      </div>

    {/*Modal to display error or confirmation messages */}
      <div>
        <Modal
          size="sm"
          show={showMessage}
          onHide={() => setShowMessage(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-modal-sizes-title-sm"
              className={typeConfirmation ? "text-success" : "text-danger"}
            >
              {typeConfirmation ? "Confirmation" : "Error"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">{Message}</p>

            {/*Confirmation or error icons in the modal */}
            {typeConfirmation ? (
              <div className="d-flex justify-content-center">
                <FontAwesomeIcon
                  className="text-success"
                  icon={faCircleCheck}
                />
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-danger"
                />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default RegisterForm;
