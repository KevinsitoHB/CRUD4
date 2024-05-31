import modelo from '../models/modelo.js';

const controlador = {
  leer: async (req, res) => {
    try {
      const datosParaLeer = await modelo.findById(req.params.id);
      if (datosParaLeer._id) {
        res.json({mensaje: 'Datos: ', datosParaLeer});
      }
    } catch (error) {
      res.json({error});
    }
  },
  leerTodos: async (req, res) => {
    try {
      const datosParaLeerTodos = await modelo.find();
      // if (leer) {
      res.json({mensaje: 'Datos: ', datosParaLeerTodos});
      // }
    } catch (error) {
      res.json({error});
    }
  },
  escribir: async (req, res) => {
    try {
      const datosEsquema = modelo(req.body);
      const datosParaGuardar = await datosEsquema.save();
      if (datosParaGuardar._id) {
        // console.log('Datos Guardados');
        res.json({mensaje: 'Datos Guardados:', datosParaGuardar});
      }
    } catch (error) {
      console.log('No guardados');
      res.json({error});
    }
  },

  actualizar: async (req, res) => {
    try {
      const datosParaActualizar = await modelo.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (datosParaActualizar._id) {
        res.json({mensaje: 'Datos actualizados: ', datosParaActualizar});
      }
    } catch (error) {
      res.json({error});
    }
  },
  eliminar: async (req, res) => {
    try {
      const datosParaEliminar = await modelo.findOneAndDelete(req.params._id);
      if (datosParaEliminar) {
        res.json({mensaje: 'Datos eliminados: ', datosParaEliminar});
      }
    } catch (error) {
      res.json({error});
    }
  },
  eliminarTodos: async (req, res) => {
    try {
      const datosParaEliminarTodos = await modelo.deleteMany({});
      if (datosParaEliminarTodos) {
        res.json({mensaje: 'Datos eliminados: ', datosParaEliminarTodos});
      }
    } catch (error) {
      res.json({error});
    }
  },
};
export default controlador;
