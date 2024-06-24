import { Router } from 'express';
import ControladorUsuarios from '../controllers/controladoresUsuarios.js';

const rutaUsuarios = Router();

rutaUsuarios.get('/:id', ControladorUsuarios.leer);
rutaUsuarios.get('/', ControladorUsuarios.leerTodos);
rutaUsuarios.post('/', ControladorUsuarios.escribir);
rutaUsuarios.put('/:id', ControladorUsuarios.actualizar);
rutaUsuarios.delete('/:id', ControladorUsuarios.eliminar);
rutaUsuarios.delete('/', ControladorUsuarios.eliminarTodos);

export default rutaUsuarios;
