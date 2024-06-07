import {Router} from 'express';

const enrutadorInicioSesion = Router();

enrutadorInicioSesion.post('/', (req, res) => {
  console.log('works!');
});
//controladorInicioSesion.iniciarSesion
export default enrutadorInicioSesion;
