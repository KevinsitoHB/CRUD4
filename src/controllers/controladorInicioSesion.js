import ModeloUsuario from '../models/modeloUsuario.js';
import generateToken from '../tools/funciones.js';
import bcryptjs from 'bcryptjs';

const ControladorInicioSesion = {
  iniciarSesion: async (req, res) => {
    try {
      console.log(req.body);
      const {usernameUsuario, passwordUsuario} = req.body;
      const usuarioEncontrado = await ModeloUsuario.findOne({
        usernameUsuario: usernameUsuario,
        // passwordUsuario: passwordReq,
      });

      const passwordEncontrado = await bcryptjs.compare(
        passwordUsuario,
        usuarioEncontrado.passwordUsuario
      );
      console.log('AQUI');
      if (passwordEncontrado) {
        const token = await generateToken({
          id: usuarioEncontrado._id,
          name: usuarioEncontrado.usuarioEncontrado,
        });
        res.json({
          message: 'Logued in!',
          token: token,
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
