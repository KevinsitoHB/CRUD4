import esquemaTrabajos from '../models/modeloTrabajos.js';

const ControladorTrabajos = {
	leer: async (req, res) => {
		try {
			const datosParaLeer = await esquemaTrabajos.findById(req.params.id);
			if (datosParaLeer._id) {
				res.json({ mensaje: 'Datos:', datosParaLeer });
			}
		} catch (error) {
			res.json({ error });
		}
	},
	leerTodos: async (req, res) => {
		try {
			const datosParaLeerTodos = await esquemaTrabajos.find();
			res.json({ mensaje: 'Datos en la coleccion:', datosParaLeerTodos });
		} catch (error) {
			res.json({ error });
		}
	},
	escribirTrabajo: async (req, res) => {
		try {
			const datosEsquema = new esquemaTrabajos({
				nombreTrabajoSubmit1: req.body.nombreTrabajoSubmit,
				tipoTrabajoSubmit: req.body.tipoTrabajoSubmit,
				fechaInicioSubmit: req.body.fechaInicioSubmit,
				fechaFinTrabajoSubmit: req.body.fechaFinTrabajoSubmit,
				inmediatoTrabajoSubmit: req.body.inmediatoTrabajoSubmit,
				salarioTrabajoSubmit: req.body.salarioTrabajoSubmit,
				comisionTrabajoSubmit: req.body.comisionTrabajoSubmit,
			});
			console.log('AQUI :>> ', datosEsquema);
			const datosParaGuardar = await datosEsquema.save();
			if (datosParaGuardar._id) {
				res.json({
					mensaje: 'Datos Guardados Trabajos:',
					Datos: datosParaGuardar,
				});
			}
		} catch (error) {
			console.log('No guardados :>> ' + error);
			res.json({ error });
		}
	},
	actualizar: async (req, res) => {
		try {
			const datosParaActualizar = await esquemaTrabajos.findByIdAndUpdate(
				req.params.id,
				req.body
			);
			if (datosParaActualizar._id) {
				const datosRefrescados =
					await esquemaTrabajos.findByIdAndUpdate(
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
			const datosParaEliminar = await esquemaTrabajos.findOneAndDelete(
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
			const datosParaEliminarTodos = await esquemaTrabajos.deleteMany({});
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
export default ControladorTrabajos;
