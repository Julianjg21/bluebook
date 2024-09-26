import React, { useState, useContext } from "react"; 
import axios from "axios";
import Cookies from "js-cookie"; 
import { Modal } from "react-bootstrap"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {
  faCircleExclamation, 
  faArrowLeft 
} from "@fortawesome/free-solid-svg-icons";
import { RenderContext } from "../../hooks/contexts/renderContext"; 
import API_ROUTES from "../../configs/ApiEndPoints.mjs";

function LoginForm() {
  
  //Defining states to handle mail, password, error message and error modal state
  const [password, setPassword] = useState("");//State for the password
  const [email, setEmail] = useState(""); //Status for the mail
  const { renderComponent } = useContext(RenderContext); //Using context to change which component is rendered
  const [errorMessage, setErrorMessage] = useState(""); //Status for the error message
const [showErrorMessage, setShowErrorMessage] = useState(false); //State to show/hide the error modal
 //Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); //Prevent default form behavior

    //Create an object with the form data
    const data = {
      email,
      password,
    };

    try {
     
      const sendFormData = await axios.post(
       API_ROUTES.sendKeysLogin, 
      data
      );

   //Extract the received token from the response
      const token = sendFormData.data.token;

      //Extract the authenticated user data from the response      
      const userData = sendFormData.data.userData;
   
    //Save the token in a cookie
      Cookies.set("authToken", token, {
        path: "/", //Make the cookie accessible from any path
        secure: true, //Only send the cookie on secure connections
        sameSite: "strict", //Prevent CSRF attacks
      });

    //Save the authenticated user's data in a cookie
      Cookies.set("userData", JSON.stringify(userData), {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

 //Redirect user to protected path after login
      window.location.href = "/home";
    } catch (error) {
      //If authentication fails, reset the form fields and display the error message
      setEmail(""); //Clear the mail field
      setPassword(""); //Clear the password field
      setErrorMessage(error.response.data); //Show the error message
      console.error(
        "Authentication failed",
error.response ? error.response.data : error.message
      );
      setShowErrorMessage(true); //Show the error modal
    }
  };

  return (
    <div className="p-0">
      <div className="row">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-5"></div>
      </div>

      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
          <h1 className="fs-6 text-primary mt-2 text-center">
            Blue NoteBook
          </h1>
        </div>
        <div className="col-1"></div>
      </div>

    {/*Login form */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 auth-cols">
          <div className="row bg-white">
    
            <form className="form-control pt-0" onSubmit={handleSubmit}>
              
      {/*Button to return to the previous window*/}
              <div className="row">
                <div className="col-1 p-0">
                  <button
                    type="button"
                    className="btn btn-outline-primary border-0 rounded-0"
                    onClick={() => renderComponent("AuthContainer")}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className="col-10 mt-4">
                  <h1 className="fs-5 text-primary-emphasis text-center">
                    Iniciar Sesión
                  </h1>
                </div>
                <div className="col-1"></div>
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
                    value={email}
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
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Ingresa tu contraseña"
                    id="userPassword"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

             {/*Submit button */}
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-4 mb-4">
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
        <div className="col-3"></div>
      </div>

    {/*Error modal */}
      <div>
        <Modal
          size="sm"
          show={showErrorMessage}
          onHide={() => setShowErrorMessage(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm" className="text-danger">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">{errorMessage}</p>
            <div className="d-flex justify-content-center">
              <FontAwesomeIcon icon={faCircleExclamation} className="text-danger" />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

//Export the LoginForm component
export default LoginForm;
