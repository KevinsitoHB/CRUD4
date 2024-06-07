import ModeloUsuario from '../models/modeloUsuario.js';
import bcryptjs from 'bcryptjs';
import {generateToken} from '../tools/funciones.js';

const ControladorInicioSesion = {
  iniciarSesion: async (req, res) => {
    try {
      const {username, password} = req.body;
      const usuarioEncontrado = await ModeloUsuario.findOne({
        usernameUsuario: username,
        // passwordlUsuario: password,
      });
      const passwordEncontrado = await bcryptjs.compare(
        password,
        usuarioEncontrado.passwordlUsuario
      );
      if (passwordEncontrado) {
        generateToken();
      }
      if (usuarioEncontrado) {
        console.log('usuarioEncontrado', usuarioEncontrado);
        res.json({
          message: 'Session iniciada',
        });
      }
    } catch (error) {
      res.json({message: 'Error al iniciar sesión: ', error});
    }
  },
};
export default ControladorInicioSesion;
