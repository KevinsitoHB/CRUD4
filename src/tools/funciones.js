import jwt from 'jsonwebtoken';

function generateToken(payload) {
  console.log('generating token...');
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'SECURE KEY', {expiresIn: '1h'}, (error, token) => {
      if (error) {
        reject({error});
      } else {
        resolve({token});
      }
    });
  });
}
export default generateToken;
