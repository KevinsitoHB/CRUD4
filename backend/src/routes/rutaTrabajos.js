import { Router } from 'express';
import controladorTrabajos from '../controllers/controladorTrabajos';
const rutaTrabajos = Router();

rutaTrabajos.get('/', controladorTrabajos.leer);
rutaTrabajos.post('/', controladorTrabajos.escribir);
rutaTrabajos.put('/', controladorTrabajos.actualizar);
rutaTrabajos.delete('/', controladorTrabajos.eliminar);

export default rutaTrabajos;
