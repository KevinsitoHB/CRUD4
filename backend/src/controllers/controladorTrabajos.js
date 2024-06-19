import esquemaTrabajos from '../models//modeloTrabajos.js';
import bcrypt from 'bcryptjs';

const controladorTrabajos = {
	leer: async (req, res) => {
		try {
			const datosParaLeer = await modelo.findById(req.params.id);
			if (datosParaLeer._id) {
				res.json({ mensaje: 'Datos:', datosParaLeer });
			}
		} catch (error) {
			res.json({ error });
		}
	},
	leerTodos: async (req, res) => {
		try {
			const datosParaLeerTodos = await modelo.find();
			res.json({ mensaje: 'Datos en la coleccion:', datosParaLeerTodos });
		} catch (error) {
			res.json({ error });
		}
	},
	escribir: async (req, res) => {
		try {
			const datosEsquema = modelo(req.body);
			const datosParaGuardar = await datosEsquema.save();
			if (datosParaGuardar._id) {
				res.json({ mensaje: 'Datos Guardados:', datosParaGuardar });
			}
		} catch (error) {
			console.log('No guardados');
			res.json({ error });
		}
	},

	actualizar: async (req, res) => {
		try {
			const datosParaActualizar = await modelo.findByIdAndUpdate(
				req.params.id,
				req.body
			);
			if (datosParaActualizar._id) {
				const datosRefrescados = await modelo.findByIdAndUpdate(
					req.params.id,
					req.body
				);
				res.json({ mensaje: 'Datos actualizados:', datosRefrescados });
			}
		} catch (error) {
			res.json({ error });
		}
	},
	eliminar: async (req, res) => {
		try {
			const datosParaEliminar = await modelo.findOneAndDelete(
				req.params._id
			);
			if (datosParaEliminar) {
				res.json({
					mensaje: 'Datos previos eliminados:',
					datosParaEliminar,
				});
			}
		} catch (error) {
			res.json({ error });
		}
	},
	eliminarTodos: async (req, res) => {
		try {
			const datosParaEliminarTodos = await modelo.deleteMany({});
			if (datosParaEliminarTodos) {
				res.json({
					mensaje: 'Datos eliminados:',
					datosParaEliminarTodos,
				});
			}
		} catch (error) {
			res.json({ error });
		}
	},
};
export default controladorTrabajos;