import esquemaUsuario from '../models/modeloUsuario.js';
import generateToken from '../tools/funciones.js';
import bcryptjs from 'bcryptjs';

const ControladorInicioSesion = {
  iniciarSesion: async (req, res) => {
    try {
      const {usernameUsuario, passwordUsuario} = esquemaUsuario(req.body);
      console.log('AQUI', usernameUsuario, passwordUsuario);
      const usuarioEncontrado = await esquemaUsuario.findOne({
        usernameUsuarioEsquema: usernameUsuario,
      });
      console.log('AQUI2', usuarioEncontrado);

      const passwordEncontrado = await bcryptjs.compare(
        passwordUsuario,
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
