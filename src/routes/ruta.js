import {Router} from 'express';
import controlador from '../controllers/controladores.js';

const ruta = Router();
ruta.post('/', controlador.escribir);
ruta.get('/', controlador.leer);
ruta.get('/', controlador.actualizar);
ruta.get('/', controlador.eliminar);

export default ruta;
