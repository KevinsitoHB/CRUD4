import ModeloUsuario from '../models/modeloUsuario.js';
import bcryptjs from 'bcryptjs';
import generateToken from '../tools/funciones.js';

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
        const token = await generateToken({
          id: usuarioEncontrado._id,
          name: usuarioEncontrado.username,
        });
        res.json({
          message: 'Logued in!',
        });
      } else {
        res.json({
          message: 'Denied',
        });
      }
    } catch (error) {
      res.json({message: 'Error al iniciar sesión: ', error});
    }
  },
};
export default ControladorInicioSesion;
