import { Schema, model } from 'mongoose';

const esquemaTrabajos = new Schema(
	{
		nombreTrabajoSubmit: { type: String, required: true },
		tipoTrabajoSubmit: { type: String, required: true },
		fechaInicioSubmit: { type: String, required: true },
		fechaFinTrabajoSubmit: { type: String, required: true },
		inmediatoTrabajoSubmit: { type: Boolean, required: true },
		salarioTrabajoSubmit: { type: Number, required: true },
		comisionTrabajoSubmit: { type: Number, required: true },
	},
	{ versionKey: false, timestamps: true }
);

export default model('TrabajosDB', esquemaTrabajos);
