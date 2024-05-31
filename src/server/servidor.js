import express from 'express';
import morgan from 'morgan';
import ruta from '../routes/ruta.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/', ruta);
//
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor conectado',
  });
});
export default app;
