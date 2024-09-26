import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchGetTasks = () => {
    const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para obtener las notas desde la API
  const handleGetTasks = async () => {
    const userData = JSON.parse(Cookies.get("userData")); // Obtener datos del usuario
    const user_id = userData.id; // Extraer el ID del usuario

    try {
        const getData = await axios.get(API_ROUTES.getTasks, {
          params: { user_id }, // Send user ID as a query parameter
        });

        // Format the dates of each task before setting the state
        const tasksWithFormattedDate = getData.data.tasks.map((task) => ({
          ...task,
          due_date: new Date(task.due_date).toISOString().split("T")[0], // Format the due date
          created_at: new Date(task.created_at).toISOString().split("T")[0], // Format the creation date
        }));

        setTasksList(tasksWithFormattedDate); // Update tasks list state
    } catch (error) {
        setError(error.response ? error.response.data : error.message); // Guardar error
        console.error(
          "The server has not worked",
          error.response ? error.response.data : error.message
        );
      } finally {
      setLoading(false); // Finalizar estado de carga
    }handleGetTasks();
  };

 /* 
  */ // Solo una vez al montar

  // Retorna las notas, el estado de carga, error y una función para refrescar
  return { tasksList, loading, error, refreshTasks: handleGetTasks };
};

export default FetchGetTasks;
