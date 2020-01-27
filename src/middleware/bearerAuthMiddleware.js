'use strict';


const User = require('../../models/user');
const users = new User();

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  console.log('made it here');
  let token = req.headers.authorization.split(' ').pop(); 
  
  users
    .authenticateToken(token)
    .then(validUser => {
      req.user = validUser;      
      next();
    })
    .catch(err => next('Invalid Login'));
  
};