const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { trim } = require('lodash');
const User = require('../models/User');

const jwtSignOptions = {
  expiresIn: '12h',
  algorithm: 'RS256',
};

const getPrivateKey = () => (
  fs.readFileSync(path.resolve(__dirname, '../../private.key'), 'utf8')
);

const getTokenFromLogin = async ({ email, password }) => {
  if (!trim(email) || !trim(password)) {
    return null;
  }

  const user = await User.query().findOne({ email });
  if (user) {
    const passIsOk = await bcrypt.compare(password, user.password);
    if (passIsOk) {
      const token = jwt.sign({ id: user.id }, getPrivateKey(), jwtSignOptions);
      return token;
    }
  }

  return null;
};

module.exports = getTokenFromLogin;
