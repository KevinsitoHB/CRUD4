const ControladorInicioSesion = {
  iniciarSesion: async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      console.log(username + ' ' + password);
      res.json({
        message: 'Session iniciada',
      });
    } catch (error) {
      res.json({message: 'Error al iniciar sesión: ', error});
    }
  },
};
export default ControladorInicioSesion;
