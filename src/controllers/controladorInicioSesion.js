import esquemaUsuario from '../models/modeloUsuario.js';
import generateToken from '../tools/funciones.js';
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
};
export default ControladorInicioSesion;
