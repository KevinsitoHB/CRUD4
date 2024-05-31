import {Router} from 'express';
import controlador from '../controllers/controladores.js';

const ruta = Router();
ruta.get('/', controlador.leer);
ruta.post('/', controlador.escribir);
ruta.get('/', controlador.actualizar);
ruta.get('/', controlador.eliminar);
ruta.get('/', controlador.eliminarTodos);

export default ruta;
