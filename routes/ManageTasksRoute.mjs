import express from "express";
import { getTaskController, SaveTaskController, EditTaskController, deleteTaskController} from "../controllers/ManageTasksController.mjs";

const router = express.Router();
//Acceder al controlador para guardar tareas
router.post('/addTasks', SaveTaskController);
//Acceder al controlador para obtener las tareas registradas
router.get('/getTasks', getTaskController);
//Acceder al controlador para editar la tarea expecificada
router.put('/editTask/:id', EditTaskController);
//Acceder al controlador para eliminar la tarea especificada
router.delete('/deleteTask/:id', deleteTaskController);

export default router;
