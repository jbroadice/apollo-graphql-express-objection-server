const { Router } = require('express');
const getTokenFromLogin = require('../utils/getTokenFromLogin');

const router = new Router();

router.post('/signin', async (req, res) => {
  const token = await getTokenFromLogin(req.body);

  if (!token) {
    res.status(401);
  }

  res.send({ token });
});

module.exports = router;
