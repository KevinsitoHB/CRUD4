import express from 'express';
import morgan from 'morgan';
import ruta from '../routes/ruta.js';
import enrutadorInicioSesion from '../routes/rutaInicioSesion.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/empleos', ruta);
app.use('/inicio-sesion', enrutadorInicioSesion);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor conectado',
  });
});
export default app;
