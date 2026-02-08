import jwt from 'jsonwebtoken';

export function gerarToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}


export function validarToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valido: true, dados: decoded };
  } catch (error) {
    return { valido: false, erro: 'Token inválido ou expirado' };
  }
}