var jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require('../errors/unauthenicated')
const authenticationMiddleware = async (req, res, next) => {
  debugger
try{
 const authorized = req.headers.authorization;
  if (!authorized || !authorized.startsWith("Bearer ")) {
    throw new UnauthenticatedError("please provide token");
  }
  let token = authorized.split(" ")[1];
  var decode = jwt.verify(JSON.parse(JSON.stringify(token)), process.env.JWT_SECRET);
  const{id,username}=decode
  req.user={id,username}
  next();
}
 catch(error){
     throw new UnauthenticatedError('Not Autrized to access this route')
}
}
module.exports = authenticationMiddleware;