import { Schema, model } from 'mongoose';

const esquemaTrabajos = new Schema(
	{
		nombreTrabajo: { type: String, required: true },
		tipoTrabajo: { type: String, required: true },
		disponibilidadTrabajo: { type: String, required: true },
		fechaInicioTrabajo: { type: Date, required: true },
		fechaFinalizacionTrabajo: { type: Date, required: false },
		salarioTrabajo: { type: Number, required: true },
		comisionTrabajo: { type: Boolean, required: true },
		imagen: { type: Buffer, contentType: String, required: false },
	},
	{ strict: false, versionKey: false, timestamps: true }
);

export default model('TrabajosDB', esquemaTrabajos);
