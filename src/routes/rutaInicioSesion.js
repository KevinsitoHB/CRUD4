import {Router} from 'express';
import ControladorInicioSesion from '../controllers/controladorInicioSesion.js';

const rutaInicioSesion = Router();

rutaInicioSesion.post('/', ControladorInicioSesion.iniciarSesion);

export default rutaInicioSesion;
