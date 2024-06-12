import jwt from 'jsonwebtoken';

export function generateToken(payload) {
  console.log('generating token...');
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'SECURE KEY', {expiresIn: '1h'}, (error, token) => {
      if (error) {
        reject({error});
      } else {
        resolve({token});
        console.log('token :>> ', token);
      }
    });
  });
}

export function verificarToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'SECURE KEY', (error, decodificado) => {
      if (error) {
        reject(error);
      } else {
        resolve(decodificado);
      }
    });
  });
}
