import {Router} from 'express';
import controlador from '../controllers/controladores.js';

const ruta = Router();
ruta.get('/:id', controlador.leer);
ruta.get('/', controlador.leerTodos);
ruta.post('/', controlador.escribir);
ruta.put('/:id', controlador.actualizar);
ruta.delete('/:id', controlador.eliminar);
ruta.delete('/', controlador.eliminarTodos);

export default ruta;
