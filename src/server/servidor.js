import express from 'express';
import morgan from 'morgan';
import rutaUsuarios from '../routes/ruta.js';
import enrutadorInicioSesion from '../routes/rutaInicioSesion.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/usuarios', rutaUsuarios);
app.use('/inicio-sesion', enrutadorInicioSesion);

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor local conectado',
  });
});
export default app;
