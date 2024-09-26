// hooks/useDeleteNote.js
import { useState } from "react";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchDeleteNotes = () => {
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_ROUTES.deleteNotes}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setAlert({
        show: true,
        title: "Success",
        message: "Note deleted successfully!",
        variant: "success",
      });

      // Ocultar alerta después de 5 segundos
    } catch (error) {
      console.error("Error deleting note:", error);
      setAlert({
        show: true,
        title: "Error",
        message: "Could not delete the note. Please try again.",
        variant: "danger",
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

  return { alert, deleteNote, handleCloseAlert };
};

export default FetchDeleteNotes;
