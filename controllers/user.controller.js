const User = require('../models/user.model');

exports.createUser = (req, res) => {
  try {
    var newUser = new User(req.body);

    newUser.save((err, user) => {
      if (err) {
        res.status(409);
        res.json({ message: 'createUser', error: err });
      } else {
        res.json(user);
      }
    });
  } catch (err) {
    console.log('err: ', err);
  }
};
