'use strict';


const User = require('../../models/user');


module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  console.log('made it here');
  let token = req.headers.authorization.split(' ').pop(); 
  
  User.authenticateToken(token)  
    .then(validUser => {
      req.user = validUser;      
      next();
    })
    .catch(err => {
      console.log(err);
      next('Invalid Login');
    });
  
};