import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rutaUsuarios from '../routes/rutaUsuarios.js';
import rutaTrabajos from '../routes/rutaTrabajos.js';
import rutaInicioSesion from '../routes/rutaInicioSesion.js';
import rutaTrabajos from '../routes/rutaTrabajos.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/usuarios', rutaUsuarios);
app.use('/inicio-sesion', rutaInicioSesion);
app.use('/jobs', rutaTrabajos);

app.get('/', (req, res) => {
	res.json({
		mensaje: 'Servidor local conectado',
	});
});
export default app;
