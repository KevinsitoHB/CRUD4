import {Schema, model} from 'mongoose';

const esquema = new Schema({
  nombre: {type: String, required: true},
});
export default model('modelox', esquema);
