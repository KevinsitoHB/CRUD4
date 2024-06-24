import 'dotenv/config';
import server from './servidor.js';
import './conexionDB.js';

server.listen(3000, () => {
	console.log('Conectado en el puerto 3000');
});
