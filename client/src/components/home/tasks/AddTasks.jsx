import React, { useState, useEffect } from "react";
import NewTaskModal from "../../../common/modals/tasks/NewTaskModal"; // Modal para agregar nuevas tareas
import Cookies from "js-cookie"; // Para manejar cookies
import axios from "axios"; // Para hacer peticiones HTTP
import WatchTasksModal from "../../../common/modals/tasks/WatchTasksModal"; // Modal para visualizar tareas
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";
function AddTasks() {
  //State to store the data of the selected task
  const [taskData, setTaskData] = useState([]);

 //State to store the text written in the search engine
  const [searchQuery, setSearchQuery] = useState("");

  //State that controls whether the create new task modal is visible
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  //State that controls whether the task view modal is visible
  const [showTaskModal, setShowTaskModal] = useState(false);

//State to store the list of tasks obtained
  const [TasksList, setTasksList] = useState([]);

 //Function to activate the new task creation modal
  const handleShowNewTaskModal = () => setShowNewTaskModal(true);

//Function to disable the new task creation modal
  const handleCloseNewTaskModal = () => setShowNewTaskModal(false);

  //Function to activate the task view modal with the data of a selected task
  const handleShowTaskModal = (task) => {
    setTaskData(task); //Save the data of the selected task
    setShowTaskModal(true); //Show the modal
  };
 //Function to disable the task view modal
  const handleCloseShowTaskModal = () => setShowTaskModal(false);

  //useEffect to bring in the task list when the component is mounted or updated
  useEffect(() => {
    const handleGetTasks = async () => {
     //Get the user_id from cookies
      const userData = JSON.parse(Cookies.get("userData"));
      const user_id = userData.id;

      try {
   //Request to the server to obtain the user's tasks
        const getData = await axios.get(
         API_ROUTES.getTasks ,
          {
            params: { user_id }, //Send the user_id as a parameter
          }
        );

        //Format the dates of each task before updating the status
        const tasksWithFormattedDate = getData.data.tasks.map((task) => ({
          ...task,
          due_date: new Date(task.due_date).toISOString().split("T")[0], //Format expiration date
          created_at: new Date(task.created_at).toISOString().split("T")[0], //Format creation date
        }));
setTasksList(tasksWithFormattedDate); //Update task list with formatted dates
      } catch (error) {
        //Error handling in case of server failure
        console.error(
          "The server has not worked",
          error.response ? error.response.data : error.message
        );
      }
    };
handleGetTasks(); //Execute the function to get the tasks
  }, [TasksList]); //UseEffect dependency: updates when TasksList changes

  //Filter the list of tasks based on the search performed
  const filteredTasks = TasksList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row mt-4 border-bottom border-2">
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-6">
                <h1 className="fs-4">Tasks</h1> 
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    {/*Button to add a new task */}
                    <button
                      className="float-end border-0 mt-1 text-primary fw-semibold grey-color"
                      onClick={handleShowNewTaskModal}
                    >
                      + Nueva Tarea
                    </button>
                  </div>
                  <div className="col-6">
              {/*Task search input */}
                    <form className="form-inline my-2 my-lg-0">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} //Update the search
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/*Modal para crear nueva tarea */}
        <NewTaskModal
          stateNewTaskModal={showNewTaskModal}
          handleNewTaskModalClose={handleCloseNewTaskModal}
        />

        {/*Modal para ver tarea seleccionada */}
        <WatchTasksModal
          stateShowTaskModal={showTaskModal}
          handleCloseShowTaskModal={handleCloseShowTaskModal}
          taskData={taskData}
        />

   {/*Rendering of the filtered task list */}
        <div className="row mt-3 border-bottom border-2">
          <div className="col-12">
            <div className="row">
              <div className="col-2">
                <p className="fw-semibold">Estado</p> 
              </div>
              <div className="col-3 col-sm-2">
                <p className="fw-semibold">Título</p> 
              </div>
              <div className="col-1 col-sm-3 d-none d-sm-block">
                <p className="fw-semibold">Descripción</p> 
              </div>
              <div className="col-3 col-sm-2">
                <p className="fw-semibold">Fecha creación</p> 
              </div>
              <div className="col-2 col-sm-2 d-none d-sm-block">
                <p className="fw-semibold">Fecha Vencimiento</p> 
              </div>
              <div className="col-2 col-sm-1">
                <p className="fw-semibold">Prioridad</p> 
              </div>
            </div>
          </div>
        </div>

      {/*Check for filtered tasks and render them */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <React.Fragment key={index}>
              <div
                className="row mt-3 border border-1 pointer shadow rounded-5 border-success bg-light"
                onClick={() => handleShowTaskModal(task)}
              >
                <div className="col-12">
                  <div className="row mt-3">
                    <div className="col-2">
                  
                      <div className="form-check">
                        <input
                          className="form-check-input custom-checkbox border border-dark rounded-circle"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                    <div className="col-3 col-sm-2">
                      <p className="text-truncate w-75">{task.title}</p> 
                    </div>
                    <div className="col-1 col-sm-3 d-none d-sm-block">
                      <p className="text-truncate w-75">{task.description}</p> 
                    </div>
                    <div className="col-4 col-sm-2">
                      <p className="text-truncate w-75">{task.created_at}</p> 
                    </div>
                    <div className="col-2 col-sm-2 d-none d-sm-block">
                      <p>{task.due_date}</p> 
                    </div>
                    <div className="col-2 col-sm-1">
                      <p className="fw-semibold text-danger">{task.status}</p> 
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No hay tareas disponibles.</p> //Message if there are no tasks
        )}
      </div>
    </div>
  );
}

export default AddTasks;
