import {Router} from 'express';
import controlador from '../controllers/controladoresUsuarios.js';

const rutaUsuarios = Router();
rutaUsuarios.get('/:id', controlador.leer);
rutaUsuarios.get('/', controlador.leerTodos);
rutaUsuarios.post('/', controlador.escribir);
rutaUsuarios.put('/:id', controlador.actualizar);
rutaUsuarios.delete('/:id', controlador.eliminar);
rutaUsuarios.delete('/', controlador.eliminarTodos);

export default rutaUsuarios;
