// import modelo from '../models/modelo.js';
import esquemaUsuario from '../models/modeloUsuario.js';
import bcrypt from 'bcryptjs';

const controlador = {
  leer: async (req, res) => {
    try {
      const datosParaLeer = await esquemaUsuario.findById(req.params.id);
      if (datosParaLeer._id) {
        res.json({mensaje: 'Datos:', datosParaLeer});
      }
    } catch (error) {
      res.json({error});
    }
  },
  leerTodos: async (req, res) => {
    try {
      const datosParaLeerTodos = await esquemaUsuario.find();
      res.json({mensaje: 'Datos en la coleccion:', datosParaLeerTodos});
    } catch (error) {
      res.json({error});
    }
  },
  escribir: async (req, res) => {
    try {
      // const {usernameUsuario, emailUsuario, passwordUsuario} = req.body;
      const {usernameUsuario, passwordUsuario} = esquemaUsuario(req.body);
      // const protectedPassword = await bcrypt.hash(passwordUsuario, 10);
      // console.log(protectedPassword);
      // // const datosNuevoEsquema = new esquemaUsuario({
      //   usernameUsuario,
      //   emailUsuario,
      //   passwordUsuario: protectedPassword,
      // });
      const datosNuevoEsquema = new esquemaUsuario({
        usernameUsuario,
        // passwordUsuario: protectedPassword,
        passwordUsuario,
      });
      console.log('aqui');

      const datosParaGuardar = await datosNuevoEsquema.save();
      res.json({datosParaGuardar: datosParaGuardar});
      // if (datosParaGuardar._id) {
      //   // console.log('Datos Guardados');
      //   res.json({mensaje: 'Datos Guardados:', datosParaGuardar});
      // }
    } catch (error) {
      console.log('No guardados USUARIOS');
      res.json({mensaje: error});
    }
  },

  actualizar: async (req, res) => {
    try {
      const datosParaActualizar = await esquemaUsuario.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (datosParaActualizar._id) {
        const datosRefrescados = await esquemaUsuario.findByIdAndUpdate(
          req.params.id,
          req.body
        );
        res.json({mensaje: 'Datos actualizados:', datosRefrescados});
      }
    } catch (error) {
      res.json({error});
    }
  },
  eliminar: async (req, res) => {
    try {
      const datosParaEliminar = await esquemaUsuario.findOneAndDelete(
        req.params._id
      );
      if (datosParaEliminar) {
        res.json({mensaje: 'Datos previos eliminados:', datosParaEliminar});
      }
    } catch (error) {
      res.json({error});
    }
  },
  eliminarTodos: async (req, res) => {
    try {
      const datosParaEliminarTodos = await esquemaUsuario.deleteMany({});
      if (datosParaEliminarTodos) {
        res.json({mensaje: 'Datos eliminados:', datosParaEliminarTodos});
      }
    } catch (error) {
      res.json({error});
    }
  },
};
export default controlador;
