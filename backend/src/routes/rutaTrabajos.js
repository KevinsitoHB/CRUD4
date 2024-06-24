import { Router } from 'express';
import ControladorTrabajos from '../controllers/controladorTrabajos.js';

const rutaTrabajos = Router();

rutaTrabajos.get('/:id', ControladorTrabajos.leer);
rutaTrabajos.get('/', ControladorTrabajos.leerTodos);
rutaTrabajos.post('/', ControladorTrabajos.escribirTrabajo);
rutaTrabajos.put('/:id', ControladorTrabajos.actualizar);
rutaTrabajos.delete('/:id', ControladorTrabajos.eliminar);
rutaTrabajos.delete('/', ControladorTrabajos.eliminarTodos);

export default rutaTrabajos;
