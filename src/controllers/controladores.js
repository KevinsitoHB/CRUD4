import modelo from '../models/modelo.js';

const controlador = {
  escribir: async (req, res) => {
    try {
      const datosEsquema = modelo(req.body);
      const datosParaGuardar = await datosEsquema.save();
      if (datosParaGuardar._id) {
        console.log('Datos Guardados');
      }
    } catch (error) {
      console.log('No guardados');
      res.json({error});
    }
  },
  leer: async (req, res) => {
    try {
    } catch (error) {}
  },
  actualizar: async (req, res) => {
    try {
    } catch (error) {}
  },
  eliminar: async (req, res) => {
    try {
    } catch (error) {}
  },
};
export default controlador;
