import {Schema, model} from 'mongoose';

const esquemaUsuario = new Schema(
  {
    usernameUsuarioEsquema: {type: String, required: true},
    passwordUsuarioEsquema: {type: String, required: true},
    emailUsuarioEsquema: {type: String, required: false},
  },

  {strict: false}
);
export default model('Usuarios', esquemaUsuario);
