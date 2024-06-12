import esquemaUsuario from '../models/modeloUsuario.js';
import {generateToken, verificarToken} from '../tools/funciones.js';
import bcryptjs from 'bcryptjs';

const ControladorInicioSesion = {
  iniciarSesion: async (req, res) => {
    try {
      const {usernameUsuarioEsquema, passwordUsuarioEsquema} = esquemaUsuario(
        req.body
      );
      const usuarioEncontrado = await esquemaUsuario.findOne({
        usernameUsuarioEsquema: usernameUsuarioEsquema,
      });

      console.log('AQUI', usuarioEncontrado);

      const passwordEncontrado = await bcryptjs.compare(
        passwordUsuarioEsquema,
        usuarioEncontrado.passwordUsuarioEsquema
      );
      if (passwordEncontrado) {
        const token = await generateToken({
          id: usuarioEncontrado._id,
          nombreDeUsuario: usuarioEncontrado.usernameUsuarioEsquema,
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
  validarToken: async (req, res) => {
    try {
      const token = res.params.token;
      const decoded = await verificarToken(token);
      if (decoded.id) {
        res.json({
          mensaje: 'Token validado',
          token: token,
        });
      } else {
        res.json({
          mensaje: 'Token No validado',
        });
      }
    } catch (error) {
      res.json({
        mensaje: 'Token No validado',
        error: error,
      });
    }
  },
};
export default ControladorInicioSesion;
