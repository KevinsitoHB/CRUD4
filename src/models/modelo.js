import {Schema, model} from 'mongoose';

const esquema = new Schema(
  {
    nombreTrabajo: {type: String, required: true},
    tipoTrabajo: {type: String, required: true},
    disponibilidadTrabajo: {type: String, required: true},
    fechaInicioTrabajo: {type: Date, required: true},
    fechaFinalizacionTrabajo: {type: Date, required: false},
    salarioTrabajo: {type: Number, required: true},
    comisionTrabajo: {type: Boolean, required: true},
  },
  {strict: true}
);
export default model('Datos_Trabajos', esquema);
