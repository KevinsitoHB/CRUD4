import { Schema, model } from 'mongoose';

const esquemaTrabajos = new Schema(
	{
		nombreTrabajoSubmit: { type: String, required: false },
		tipoTrabajoSubmit: { type: String, required: false },
		fechaInicioSubmit: { type: String, required: false },
		fechaFinTrabajoSubmit: { type: String, required: false },
		inmediatoTrabajoSubmit: { type: Boolean, required: false },
		salarioTrabajoSubmit: { type: Number, required: false },
		comisionTrabajoSubmit: { type: Number, required: false },
	},
	{ versionKey: false, timestamps: false }
);

export default model('TrabajosDB', esquemaTrabajos);
