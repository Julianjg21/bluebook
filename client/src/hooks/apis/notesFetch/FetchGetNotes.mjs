import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchGetNotes = () => {
  const [getNotes, setGetNotes] = useState([]); //Estado para las notas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para obtener las notas desde la API
  const handleGetNotes = async () => {
    const userData = JSON.parse(Cookies.get("userData")); // Obtener datos del usuario
    const user_id = userData.id; // Extraer el ID del usuario

    try {
      setLoading(true); // Iniciar estado de carga

      const getData = await axios.get(API_ROUTES.getNotes, {
        params: { user_id }, // Pasar user_id como parámetro
      });

      setGetNotes(getData.data.notes); // Actualizar las notas
      setError(null); // Resetear error en caso de éxito
    } catch (error) {
      setError(error.response ? error.response.data : error.message); // Guardar error
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
    handleGetNotes();
  };

  /* useEffect(() => {
     // Llamar a la función para obtener las notas al montar el componente
  }, []); */ // Solo una vez al montar

  // Retorna las notas, el estado de carga, error y una función para refrescar
  return { getNotes, loading, error, refreshNotes: handleGetNotes };
};

export default FetchGetNotes;
