import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import EditTaskModal from "./EditTaskModal";
import CustomAlert from "../../Alerts/CustomAlert";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

function WatchTasksModal({
  stateShowTaskModal,       //State to show or hide the task modal
  handleCloseShowTaskModal,  //Function to close the task modal
  taskData,                  //Data of the selected task (title, description, etc.)
}) {
  // Status to control alerts
  const [alert, setAlert] = useState({
    show: false,
    title: '',
    message: '',
    variant: ''
  });

  //State to handle the visibility of the task editing modal
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

 //Function to show the task editing modal and close the current modal
  const handleShowEditTaskModal = () => {
    handleCloseShowTaskModal();     //Close the current modal
    setShowEditTaskModal(true);     //Show the editing modal
  };

 //Function to delete the selected task
  const handleDeleteNote = async () => {
    const id = taskData.id; //Get the task ID
    try {
     //Make a DELETE request to the API to delete the task
      const response = await axios.delete(
        `${API_ROUTES.deleteNotes}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            
          },
        }
      );
      console.log("Tarea eliminada exitosamente", response.data);

 //Display a success alert when deleting the task
      setAlert({
        show: true,
        title: 'Éxito',
        message: '¡Tarea eliminada con éxito!',
        variant: 'success'
      });

     //Hide the alert after 3 seconds
      setTimeout(() => setAlert({ ...alert, show: false }), 3000);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);

    //Display an error alert if the deletion fails
      setAlert({
        show: true,
        title: 'Error',
        message: 'No se ha podido eliminar la tarea. Intenta nuevamente.',
        variant: 'danger'
      });

    //Hide the alert after 5 seconds
      setTimeout(() => setAlert({ ...alert, show: false }), 5000);
    }

  //Close the modal after trying to delete the task
    handleCloseShowTaskModal();
  };

//Function to close alerts
  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  //Function to close the task editing modal
  const handleCloseEditTaskModal = () => setShowEditTaskModal(false);

  return (
    <div>
      {/*Custom alert component*/}
      <CustomAlert 
        title={alert.title}     //Alert title
        message={alert.message}//Alert message
        variant={alert.variant}//Alert type (success, danger, etc.)
        show={alert.show}        // Estado para mostrar u ocultar la alerta
        onClose={handleCloseAlert}  //Function to close the alert
      />
      <>
        {/* Modal to show the selected task*/}
        <Modal
          show={stateShowTaskModal}              //State to control the visibility of the modal
          onHide={handleCloseShowTaskModal}      //Function to close the modal
          centered                              //Center the modal on the screen
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-secondary">Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container mt-3">
             
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <label className="fw-semibold">Título</label>
                    </div>
                    <div className="col-8 col-md-9 border border-2">
                      <p className="text-break">{taskData.title}</p>
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
                    <div className="col-8 col-md-9 border border-2">
                      <p className="text-break">{taskData.description}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row mt-4">
                <div className="col-12">
                  <div className="row">
                    <div className="col-4 col-md-3">
                      <p className="fw-semibold">Fecha Vencimiento</p>
                    </div>
                    <div className="col-8 col-md-9 border border-2">
                      <p>{taskData.due_date}</p>
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
                    <div className="col-8 col-md-9">
                      <p className="text-danger fw-semibold border border-2">
                        {taskData.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

         {/*Modal buttons (delete and edit task) */}
          <Modal.Footer>
            <Button 
              variant="btn btn-outline-danger" 
              onClick={handleDeleteNote}  //Delete task on click
            >
              Eliminar
            </Button>
            <Button
              variant="btn btn-outline-primary"
              onClick={handleShowEditTaskModal} //Show task edit modal
            >
              Editar
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/*Modal to edit the selected task */}
      <EditTaskModal
        taskData={taskData}                //Pass the task data to the edit modal
        stateEditTaskModal={showEditTaskModal} //Controls whether or not the edit modal is shown
        handleCloseEditTaskModal={handleCloseEditTaskModal} //Function to close the editing modal
      />
    </div>
  );
}

export default WatchTasksModal;
