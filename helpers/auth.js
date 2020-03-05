import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Auth = {

  passwordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  passwordCompare(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
  },

  generateToken(id, email, role) {
    const token = jwt.sign({
      userId: id,
      email,
      role
    },
    process.env.SECRET, { expiresIn: '3d' });
    return token;
  },

  checkToken(req, res, next) {
    const token = req.headers['authorization'] || req.body['x-access-token'] || null;

    if (!token) {
      return res.status(401).json({
        error: 'Please, sign-in!',
      });
    }
    const splitToken = token.replace(/^Bearer\s/, '')
    jwt.verify(splitToken, process.env.SECRET, (err, decoded) => {
      
      if (err) {
        return res.status(500).json({
          error: 'Failed to authenticate token',
        });
      }
      req.id = decoded.userId || null;
      req.email = decoded.email || null;
      req.role = decoded.role || null;
      next();
      return true;
    });
    return true;
  },

};

export default Auth;