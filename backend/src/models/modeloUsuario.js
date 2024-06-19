import { Schema, model } from 'mongoose';

const esquemaUsuario = new Schema(
	{
		usernameUsuarioEsquema: { type: String, required: true },
		passwordUsuarioEsquema: { type: String, required: true },
		emailUsuarioEsquema: { type: String, required: false },
	},
	{ strict: true, versionKey: false, timestamps: true }
);
export default model('UsuariosDB', esquemaUsuario);
