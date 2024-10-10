// hooks/useDeleteNote.js
import { useState } from "react";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchDeleteTasks = () => {
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${API_ROUTES.deleteTasks}/${id}`,
        {
        headers: {
          "Content-Type": "application/json",
        },
      });

       //Display a success alert when deleting the task
       setAlert({
        show: true,
        title: 'Éxito',
        message: '¡Tarea eliminada con éxito!',
        variant: 'success'
      });

      // Ocultar alerta después de 5 segundos
    } catch (error) {
      console.error("Error deleting the task:", error);
      //Display an error alert if the deletion fails
      setAlert({
        show: true,
        title: 'Error',
        message: 'No se ha podido eliminar la tarea. Intenta nuevamente.',
        variant: 'danger'
      });
    } finally {
      setTimeout(
        () => setAlert((prevAlert) => ({ ...prevAlert, show: false })),
        5000
      );
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return { alert, deleteTask, handleCloseAlert };
};

export default FetchDeleteTasks;
