import {Schema, model} from 'mongoose';

const esquemaUsuario = new Schema(
  {
    usernameUsuario: {type: String, required: true},
    // emailUsuario: {type: String, required: true},
    passwordlUsuario: {type: String, required: true},
  },

  {strict: true}
);
export default model('Usuarios', esquemaUsuario);
