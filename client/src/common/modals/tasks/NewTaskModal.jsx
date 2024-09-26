import React, { useState } from "react";
import { Modal, ModalHeader } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import CustomAlert from "../../Alerts/CustomAlert"; // Componente de alerta personalizada
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

function NewTaskModal({ stateNewTaskModal, handleNewTaskModalClose }) {

  //State to handle alerts
  const [alert, setAlert] = useState({
    show: false,
    title: '',
    message: '',
    variant: ''
  });

  //States to handle the form fields of the new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDue_date] = useState();
  const [priority, setPriority] = useState("");

 //States to handle date and priority button selection
  const [selectedDateButton, setSelectedDateButton] = useState();
  const [selectedPriorityButton, setSelectedPriorityButton] = useState();
//Handles the selection of the due date (today or tomorrow)
  const handleButtonDate = (event, buttonId) => {
    event.preventDefault();
    setSelectedDateButton(buttonId);
    
    if (buttonId === "hoy") {
      const today = new Date().toISOString().split("T")[0];
      setDue_date(today); //Assign today's date
    } else if (buttonId === "mañana") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedTomorrow = tomorrow.toISOString().split("T")[0];
      setDue_date(formattedTomorrow); //Assign tomorrow's date
    }
  };

  //Handles the selection of priority level (low, medium or high)
  const handleButtonPriority = (event, buttonId) => {
    event.preventDefault();
    setSelectedPriorityButton(buttonId);//Assigns the selected button
    setPriority(buttonId); //Set the priority
  };

//Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Obtain the ID of the logged in user, which is saved in cookies
    const userData = JSON.parse(Cookies.get("userData"));
    const user_id = userData.id;

    //Data that will save the data of the new note that will be sent to the backend
    const data = {
      title,
      description,
      due_date,
      priority,
      user_id,
    };

    try {
    
      const sendData = await axios.post(
        API_ROUTES.addTasks,
        data
      );
      console.log(sendData.data);

    //Close the modal and show a success alert
      handleNewTaskModalClose();
      setAlert({
        show: true,
        title: 'Éxito',
        message: '¡Tarea registrada con éxito!',
        variant: 'success'
      });

  //Hide the alert after 3 seconds
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);

     //Clear the form fields
      setTitle("");
      setDescription("");
      setDue_date("");
      setPriority("");
      setSelectedDateButton("");
      setSelectedPriorityButton("");

    } catch (error) {
      console.error(
        "El servidor no ha funcionado",
        error.response ? error.response.data : error.message
      );

    //Show an error alert if something fails
      setAlert({
        show: true,
        title: 'Error',
        message: 'No se ha podido registrar la tarea. Intenta nuevamente.',
        variant: 'danger'
      });

    //Hide the alert after 5 seconds
      setTimeout(() => setAlert({ ...alert, show: false }), 5000);
    }
  };

//Close the alert
  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <Modal show={stateNewTaskModal} onHide={handleNewTaskModalClose} centered>
        <ModalHeader closeButton>
          <Modal.Title className="fs-5 text-secondary">Nueva Tarea</Modal.Title>
        </ModalHeader>
       
        <Modal.Body>
          <div className="container mt-3">
            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <label className="fw-semibold">Título</label>
                    </div>
                    <div className="col-8 col-md-9">
                      <input
                        type="text"
                        className="w-100"
                        onChange={(event) => setTitle(event.target.value)}
                        required
                        maxLength="40"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <label className="fw-semibold">Descripción</label>
                    </div>
                    <div className="col-8 col-md-9">
                      <textarea
                        className="w-100 p-3"
                        onChange={(event) => setDescription(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Fecha de Vencimiento</p>
                    </div>
                    <div className="col-2">
                      <button
                        className={`mt-3 border-0 btn ${
                          selectedDateButton === "hoy" ? "btn-primary" : "btn-secondary"
                        }`}
                        onClick={(event) => handleButtonDate(event, "hoy")}
                      >
                        Hoy
                      </button>
                    </div>
                    <div className="col-4 col-md-3">
                      <button
                        className={`mt-3 border-0 btn ${
                          selectedDateButton === "mañana" ? "btn-primary" : "btn-secondary"
                        }`}
                        onClick={(event) => handleButtonDate(event, "mañana")}
                      >
                        Mañana
                      </button>
                    </div>
                    <div className="col-1 col-md-4 p-0">
                      <input
                        type="date"
                        className="mt-3 w-75"
                        value={due_date}
                        onChange={(event) => setDue_date(event.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-5 mb-3">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Prioridad</p>
                    </div>
                    <div className="col-2">
                      <button
                        className={`border-0 btn ${
                          selectedPriorityButton === "Low" ? "btn-success" : "btn-secondary"
                        }`}
                        onClick={(event) => handleButtonPriority(event, "Low")}
                      >
                        Baja
                      </button>
                    </div>
                    <div className="col-3">
                      <button
                        className={`border-0 btn ${
                          selectedPriorityButton === "Medium" ? "btn-warning" : "btn-secondary"
                        }`}
                        onClick={(event) => handleButtonPriority(event, "Medium")}
                      >
                        Media
                      </button>
                    </div>
                    <div className="col-3 p-0">
                      <button
                        className={`border-0 btn ${
                          selectedPriorityButton === "Hard" ? "btn-danger" : "btn-secondary"
                        }`}
                        onClick={(event) => handleButtonPriority(event, "Hard")}
                      >
                        Alta
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <button type="submit" className="btn btn-outline-primary w-100">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>

        {/*Custom alert component*/}
        <CustomAlert 
          title={alert.title}
          message={alert.message}
          variant={alert.variant}
          show={alert.show}
          onClose={handleCloseAlert}
        />
      </Modal>

      
     
    </>
  );
}

export default NewTaskModal;
