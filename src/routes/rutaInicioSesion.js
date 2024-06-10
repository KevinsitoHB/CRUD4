import {Router} from 'express';
import ControladorInicioSesion from '../controllers/controladorInicioSesion.js';

const enrutadorInicioSesion = Router();

enrutadorInicioSesion.post('/', ControladorInicioSesion.iniciarSesion);

export default enrutadorInicioSesion;
