const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const jwtVerifyOptions = {
  expiresIn: '12h',
  algorithm: ['RS256'],
};

const getPublicKey = () => (
  fs.readFileSync(path.resolve(__dirname, '../../public.key'), 'utf8')
);

const getUserFromRequest = async ({ headers }) => {
  if (!headers.authorization) {
    return null;
  }

  const headerMatch = headers.authorization.match(/^Bearer\s+?(.+?)\s*$/);

  if (!headerMatch) {
    return null;
  }

  const [match, token] = headerMatch;

  let verify = false;
  try {
    verify = jwt.verify(token, getPublicKey(), jwtVerifyOptions);
  } catch (e) {
    verify = false;
  }

  if (!verify) {
    return null;
  }

  // TODO: get user from db and check all good

  console.log('getUserFromRequest', { verify });

  return {
    id: verify.id,
  };
};

module.exports = getUserFromRequest;
