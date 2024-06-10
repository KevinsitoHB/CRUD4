import ModeloUsuario from '../models/modeloUsuario.js';
import generateToken from '../tools/funciones.js';
import bcryptjs from 'bcryptjs';

const ControladorInicioSesion = {
  iniciarSesion: async (req, res) => {
    try {
      const {usernameUsuario, passwordUsuario} = req.body;
      const usuarioEncontrado = await ModeloUsuario.findOne({
        usernameUsuario: usernameUsuario,
      });

      const passwordEncontrado = await bcryptjs.compare(
        passwordUsuario,
        usuarioEncontrado.passwordUsuario
      );

      if (passwordEncontrado) {
        const token = await generateToken({
          id: usuarioEncontrado._id,
          nombreDeUsuario: usuarioEncontrado.usernameUsuario,
        });
        res.json({
          message: 'Loggued in!',
          token: token,
        });
      } else {
        res.json({
          message: 'Wrong password.',
        });
      }
    } catch (error) {
      res.json({message: 'Error al iniciar sesión, usuario no encontrado.'});
    }
  },
};
export default ControladorInicioSesion;
