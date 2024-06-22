import mongoose from 'mongoose';
mongoose
	.connect(process.env.MONGODB_ATLAS_URI)
	.then(() => {
		console.log('Conectado a Mongoose');
	})
	.catch((error) => {
		console.log('Fallo en la conexion: ' + error);
	});
