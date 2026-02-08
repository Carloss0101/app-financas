import jwt from 'jsonwebtoken';

export function gerarToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}


export function validarToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}